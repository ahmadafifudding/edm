import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'

export default function DefectMonitoringLayout() {
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
      <Stack.Screen name='index' options={{ title: 'Defect Assessment' }} />
      <Stack.Screen
        name='create'
        options={{ title: 'Create Defect Assessment' }}
      />
    </Stack>
  )
}
