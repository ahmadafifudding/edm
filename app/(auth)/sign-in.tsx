import { Background } from '@/components/Background'
import { Header } from '@/components/Header'
import { LoginForm } from '@/components/LoginForm'
import { Colors } from '@/constants/Colors'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

export default function SignInScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={{ flex: 1 }}
    >
      <Header />
      <LoginForm />
      <Background />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})
