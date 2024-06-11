import { Background } from '@/components/Background'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Header } from '@/components/Header'
import { LogoutButton } from '@/components/LogoutButton'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <LogoutButton />,
        }}
      />
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <ButtonLink href='/defect-assessment'>Defect Assessment</ButtonLink>
          <ButtonLink href='/defect-monitoring'>Defect Monitoring</ButtonLink>
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
