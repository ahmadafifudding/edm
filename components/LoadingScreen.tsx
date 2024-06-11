import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors } from '@/constants/Colors'

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
})
