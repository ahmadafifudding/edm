import { ScrollView, StyleSheet } from 'react-native'
import { DefectMonitoringForm } from '@/components/DefectMonitoringForm'

export default function CreateDefectMonitoringScreen() {
  return (
    <ScrollView style={styles.container}>
      <DefectMonitoringForm />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
