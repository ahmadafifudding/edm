import { DefectMonitoringItem } from '@/components/DefectMonitoringItem'
import { LoadingScreen } from '@/components/LoadingScreen'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Tables } from '@/types/database.types'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, RefreshControl, FlatList } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function DefectMonitoringListScreen() {
  const { session } = useAuth()
  const { block } = useLocalSearchParams()

  const [defectMonitoring, setDefectMonitoring] = useState<
    Tables<'defect-monitoring'>[] | []
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (session) fetchDefectMonitoring()
  }, [session])

  const onRefresh = () => {
    setRefreshing(true)
    fetchDefectMonitoring()
    setRefreshing(false)
  }

  async function fetchDefectMonitoring() {
    try {
      setIsLoading(true)
      if (!session?.user) throw new Error('No user on the session')

      const { data, error, status } = await supabase
        .from('defect-monitoring')
        .select('*')
        .eq('created_by', session.user.id)
        .eq('block', block as string)
        .order('created_at', { ascending: false })

      if (error && status !== 406) throw error
      if (data) {
        setDefectMonitoring(data)
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
        <Stack.Screen options={{ title: block as string }} />
        <LoadingScreen />
      </>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: block as string }} />
      <FlatList
        data={defectMonitoring}
        renderItem={({ item }) => (
          <DefectMonitoringItem
            onPress={() => router.push(`/defect-monitoring/details/${item.id}`)}
            item={item}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      />
    </>
  )
}
