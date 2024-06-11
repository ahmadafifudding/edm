import { DefectAssessmentItem } from '@/components/DefectAssessmentItem'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Link } from '@/components/ui/Link'
import { Separator } from '@/components/ui/Seperator'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Tables } from '@/types/database.types'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, RefreshControl, FlatList } from 'react-native'

export default function DefectAssessmentScreen() {
  const { session } = useAuth()

  const [defectAssessment, setDefectAssessment] = useState<
    Tables<'defect-assessment'>[] | []
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (session) fetchDefectAssessment()
  }, [session])

  const onRefresh = () => {
    setRefreshing(true)
    fetchDefectAssessment()
    setRefreshing(false)
  }

  async function fetchDefectAssessment() {
    try {
      setIsLoading(true)
      if (!session?.user) throw new Error('No user on the session')

      const { data, error, status } = await supabase
        .from('defect-assessment')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error && status !== 406) throw error
      if (data) {
        setDefectAssessment(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching defect assessment', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading)
    return (
      <>
        <Stack.Screen
          options={{
            headerRight: () => (
              <Link href='/defect-assessment/create'>Add</Link>
            ),
          }}
        />
        <LoadingScreen />
      </>
    )

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Link href='/defect-assessment/create'>Add</Link>,
        }}
      />
      <FlatList
        data={defectAssessment}
        renderItem={({ item }) => <DefectAssessmentItem item={item} />}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        ItemSeparatorComponent={() => <Separator />}
      />
    </>
  )
}
