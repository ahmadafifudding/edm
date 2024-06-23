import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { router } from 'expo-router'
import * as Sharing from 'expo-sharing'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import { decode } from 'base64-arraybuffer'
import XLSX from 'xlsx'

export function DefectAssessmentForm() {
  const { session } = useAuth()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedButton, setSelectedButton] = useState<string>('')

  const downloadExcelTemplate = async (filename: string) => {
    setSelectedButton(filename)
    const excelUri = process.env.EXPO_PUBLIC_EXCEL_TEMPLATE_URI!
    const fileUri = FileSystem.documentDirectory + filename
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
    const options: DocumentPicker.DocumentPickerOptions = {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      multiple: false,
    }

    try {
      setIsUploading(true)
      const result = await DocumentPicker.getDocumentAsync(options)

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return
      }

      const file = result.assets[0]

      if (!file.uri) {
        throw new Error('No file uri')
      }

      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      const { data: uploadFile, error } = await supabase.storage
        .from('defect-assessment')
        .upload(file.name, decode(base64), {
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          upsert: false,
        })

      if (uploadFile) {
        const { error } = await supabase.from('defect-assessment').insert({
          excel_url: uploadFile?.path,
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
        label='Download Brickwork Template'
        variant='secondary'
        isLoading={isDownloading && selectedButton === 'Brickwork.xlsx'}
        onPress={() => downloadExcelTemplate('Brickwork.xlsx')}
      />
      <Button
        label='Download C&S Template'
        variant='secondary'
        isLoading={isDownloading && selectedButton === 'C&S.xlsx'}
        onPress={() => downloadExcelTemplate('C&S.xlsx')}
      />
      <Button
        label='Download Skimcoat Template'
        variant='secondary'
        isLoading={isDownloading && selectedButton === 'Skimcoat.xlsx'}
        onPress={() => downloadExcelTemplate('Skimcoat.xlsx')}
      />
      <Button
        label='Download Tiling Template'
        variant='secondary'
        isLoading={isDownloading && selectedButton === 'Tiling.xlsx'}
        onPress={() => downloadExcelTemplate('Tiling.xlsx')}
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
