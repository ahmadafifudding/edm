import { SignUpForm } from '@/components/SignUpForm'
import { Text } from '@/components/ui/Text'
import { Stack, router } from 'expo-router'
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native'

export default function SignUpScreen() {
  const windowHeight = Dimensions.get('screen').height

  const handleLogin = () => {
    router.push('/sign-in')
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Text type='link' onPress={handleLogin}>
              Login
            </Text>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <SignUpForm />
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
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
