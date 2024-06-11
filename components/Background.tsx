import { ImageBackground, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('screen').height

export function Background() {
  return (
    <ImageBackground
      source={require('@/assets/images/background.png')}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: windowHeight / 3,
        zIndex: -1,
      }}
      resizeMode='cover'
    />
  )
}
