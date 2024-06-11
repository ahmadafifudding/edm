import { Colors } from '@/constants/Colors'
import { View, StyleSheet } from 'react-native'
import { Image } from 'phosphor-react-native'

export function ImagePlaceholder() {
  return (
    <View style={styles.container}>
      <Image size={72} color={Colors.gray3} weight='duotone' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    backgroundColor: Colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
