import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { Link } from '@/components/ui/Link'
import { Text } from '@/components/ui/Text'

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>This screen doesn't exist.</Text>
      <Link href='/'>Go to home screen!</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
