import { Text } from '@/components/ui/Text'
import { Tables } from '@/types/database.types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

type DefectMonitoringItemProps = {
  item: Tables<'defect-monitoring'>
  onPress: (item: Tables<'defect-monitoring'>) => void
}

dayjs.extend(relativeTime)

export function DefectMonitoringItem({
  item,
  onPress,
}: DefectMonitoringItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://eajhcslsnmdyzequnghs.supabase.co/storage/v1/object/public/defect-monitoring-images/${item.image_url}`,
          }}
          height={50}
          width={50}
          resizeMode='cover'
        />
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text type='title'>
              {item.block} Level {item.level} (Zone {item.zone})
            </Text>
            <Text type='subtitle'>
              {dayjs(new Date(item.created_at)).fromNow()}
            </Text>
          </View>
          <Text type='subtitle' lineBreakMode='tail'>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: 'auto',
  },
})
