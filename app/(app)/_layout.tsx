import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Colors } from '@/constants/Colors'
import { LogoutButton } from '@/components/LogoutButton'

export default function HomeLayout() {
  const { session, isLoading } = useAuth()

  if (isLoading) return <LoadingScreen />

  if (!session) {
    return <Redirect href='/(auth)/sign-in' />
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { fontSize: 22, color: Colors.white },
        headerStyle: { backgroundColor: Colors.primary },
        headerTitleAlign: 'center',
        statusBarColor: Colors.primary,
        statusBarStyle: 'light',
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Home', headerRight: () => <LogoutButton /> }}
      />
      <Stack.Screen name='defect-monitoring' options={{ headerShown: false }} />
      <Stack.Screen name='defect-assessment' options={{ headerShown: false }} />
    </Stack>
  )
}
