import { Alert } from 'react-native'
import { router } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'

export function LogoutButton() {
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Error logging out', error.message)
    } else {
      router.push('/')
    }
  }
  return (
    <Text style={{ color: Colors.white }} onPress={logout}>
      Logout
    </Text>
  )
}
