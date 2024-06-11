import { Text } from '@/components/ui/Text'
import { Colors } from '@/constants/Colors'
import { Tables } from '@/types/database.types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { DownloadSimple, FileXls } from 'phosphor-react-native'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

interface DefectAssessmentItemProps {
  item: Tables<'defect-assessment'>
}

dayjs.extend(relativeTime)

export function DefectAssessmentItem({ item }: DefectAssessmentItemProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadFile = async () => {
    const excelUri = `https://eajhcslsnmdyzequnghs.supabase.co/storage/v1/object/public/defect-assessment/${item.excel_url}?t=2024-06-10T22%3A39%3A27.040Z`
    const fileUri = FileSystem.documentDirectory + item.excel_url
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

  return (
    <View style={styles.container}>
      <FileXls size={40} weight='fill' color='green' />
      <View style={styles.contentContainer}>
        <View>
          <Text type='title'>{item.excel_url.split('.')[0]}</Text>
          <Text type='subtitle' style={{ margin: 2 }}>
            {dayjs(new Date(item.created_at)).fromNow()}
          </Text>
        </View>
        <View>
          {isDownloading ? (
            <ActivityIndicator size='small' color={Colors.primary} />
          ) : (
            <TouchableOpacity onPress={downloadFile}>
              <DownloadSimple size={24} weight='fill' color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
