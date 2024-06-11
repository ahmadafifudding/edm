import { DefectMonitoringDetails } from '@/components/DefectMonitoringDetails'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Tables } from '@/types/database.types'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, RefreshControl, ScrollView, StyleSheet } from 'react-native'

export default function DefectMonitoringDetailsScreen() {
  const { session } = useAuth()
  const { defectId } = useLocalSearchParams()

  const [defect, setDefect] = useState<Tables<'defect-monitoring'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchDefect()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchDefect()
    setRefreshing(false)
  }

  async function fetchDefect() {
    try {
      setIsLoading(true)
      if (!session?.user) throw new Error('No user on the session')

      const { data, error, status } = await supabase
        .from('defect-monitoring')
        .select('*')
        .eq('id', defectId as string)
        .single()

      if (error && status !== 406) throw error
      if (data) {
        setDefect(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching defect monitoring', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Defect Monitoring Details' }} />
        <LoadingScreen />
      </>
    )
  }

  if (!defect) return null

  return (
    <>
      <Stack.Screen options={{ title: 'Defect Monitoring Details' }} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        <DefectMonitoringDetails item={defect} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
