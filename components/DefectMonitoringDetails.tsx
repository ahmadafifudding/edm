import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@/components/ui/Text'
import { Tables } from '@/types/database.types'
import { Colors } from '@/constants/Colors'

type DefectMonitoringDetailsProps = {
  item: Tables<'defect-monitoring'>
}

export function DefectMonitoringDetails({
  item,
}: DefectMonitoringDetailsProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://eajhcslsnmdyzequnghs.supabase.co/storage/v1/object/public/defect-monitoring-images/${item.image_url}`,
        }}
        height={192}
        style={styles.image}
      />
      <Text type='heading'>{item.block}</Text>
      <View style={styles.headerContainer}>
        <Text type='title'>
          Level {item.level} - Trade {item.trade} (Zone {item.zone})
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  image: {
    borderRadius: 8,
    marginBottom: 32,
  },
  headerContainer: {
    marginBottom: 16,
  },
  description: {
    color: Colors.gray4,
  },
})
