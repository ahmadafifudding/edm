import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router'
import { Background } from '@/components/Background'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Header } from '@/components/Header'
import { Link } from '@/components/ui/Link'

export default function DefectMonitoringScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Link href='/defect-monitoring/create'>Add</Link>,
        }}
      />
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <ButtonLink href='defect-monitoring/list/Tower A'>Tower A</ButtonLink>
          <ButtonLink href='defect-monitoring/list/Tower B'>Tower B</ButtonLink>
        </View>
        <Background />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
  content: {
    paddingHorizontal: 32,
    rowGap: 24,
    marginTop: 32,
  },
})
