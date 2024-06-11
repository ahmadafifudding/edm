import { DefectAssessmentForm } from '@/components/DefectAssessmentForm'
import { ScrollView, StyleSheet } from 'react-native'

export default function CreateDefectMonitoringScreen() {
  return (
    <ScrollView style={styles.container}>
      <DefectAssessmentForm />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
