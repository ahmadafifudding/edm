import { View, Image, StyleSheet } from 'react-native'

export function Header() {
  return (
    <View>
      <Image
        source={require('@/assets/images/subway-construction.png')}
        style={styles.image}
      />
      <Image source={require('@/assets/images/edm.png')} style={styles.edm} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  edm: {
    width: 200,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})
