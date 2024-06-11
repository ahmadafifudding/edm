import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.background },
        headerTitleAlign: 'center',
        statusBarStyle: 'dark',
      }}
    >
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen
        name='sign-up'
        options={{
          title: 'Create Account',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 24 },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  )
}
