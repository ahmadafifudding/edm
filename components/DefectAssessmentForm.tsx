import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { router } from 'expo-router'
import * as Sharing from 'expo-sharing'
import { useState } from 'react'
import { Alert, View } from 'react-native'

export function DefectAssessmentForm() {
  const { session } = useAuth()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const downloadExcelTemplate = async () => {
    const excelUri = process.env.EXPO_PUBLIC_EXCEL_TEMPLATE_URI!
    const fileUri =
      FileSystem.documentDirectory + 'defect-assessment-template.xlsx'
    try {
      setIsDownloading(true)
      const { uri } = await FileSystem.downloadAsync(excelUri, fileUri)

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'Save file to..',
        })
      } else {
        Alert.alert("Couldn't save the file. Please try again.")
      }
    } catch (error) {
      Alert.alert("Couldn't download the file. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const uploadFile = async () => {
    try {
      setIsUploading(true)
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        multiple: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return
      }

      const file = result.assets[0]

      if (!file.uri) {
        throw new Error('No file uri')
      }

      const fileBase64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      const fileExt = file.uri?.split('.').pop()?.toLowerCase() ?? 'xlsx'
      const path = `${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('defect-assessment')
        .upload(path, fileBase64, {
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

      if (data) {
        const { error } = await supabase.from('defect-assessment').insert({
          excel_url: data?.path,
          user_id: session?.user.id,
        })

        if (error) {
          throw error
        }
      }

      if (error) {
        Alert.alert(error.message)
      }
      setIsUploading(false)
      router.back()
    } catch (error) {
      setIsUploading(false)
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    }
  }

  return (
    <View style={{ rowGap: 16, marginTop: 32 }}>
      <Button
        label='Download Template'
        variant='secondary'
        isLoading={isDownloading}
        onPress={downloadExcelTemplate}
      />
      <Button
        label='Upload File'
        variant='primary'
        isLoading={isUploading}
        onPress={uploadFile}
      />
    </View>
  )
}
