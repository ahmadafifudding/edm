import { DefectMonitoringImage } from '@/components/DefectMonitoringImage'
import { Message } from '@/components/ui/Message'
import { Text } from '@/components/ui/Text'
import { TextArea } from '@/components/ui/TextArea'
import { Colors } from '@/constants/Colors'
import { block, level, trade, zone } from '@/data'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import {
  CreateDefectMonitoringSchema,
  createDefectMonitoringSchema,
} from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Picker } from '@react-native-picker/picker'
import { Stack, router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'

export function DefectMonitoringForm() {
  const { session } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateDefectMonitoringSchema>({
    resolver: zodResolver(createDefectMonitoringSchema),
  })

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  async function onSubmit(formData: CreateDefectMonitoringSchema) {
    const { data, error } = await supabase.from('defect-monitoring').insert([
      {
        ...formData,
        created_by: session?.user.id,
      },
    ])
    if (error) {
      Alert.alert(error.message)
      return
    }
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Text
              type='link'
              onPress={handleSubmit(onSubmit)}
              style={{ color: Colors.white }}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Text>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Text type='label'>Block</Text>
            <Controller
              name='block'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ backgroundColor: Colors.gray1 }}
                >
                  {block.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              )}
            />
            {errors.block && (
              <Message type='error'>{errors.block.message}</Message>
            )}
          </View>
          <View>
            <Text type='label'>Level</Text>
            <Controller
              name='level'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ backgroundColor: Colors.gray1 }}
                >
                  {level.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              )}
            />
            {errors.level && (
              <Message type='error'>{errors.level.message}</Message>
            )}
          </View>
          <View>
            <Text type='label'>Zone</Text>
            <Controller
              name='zone'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ backgroundColor: Colors.gray1 }}
                >
                  {zone.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              )}
            />
            {errors.zone && (
              <Message type='error'>{errors.zone.message}</Message>
            )}
          </View>
          <View>
            <Text type='label'>Trade</Text>
            <Controller
              name='trade'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ backgroundColor: Colors.gray1 }}
                >
                  {trade.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              )}
            />
            {errors.zone && (
              <Message type='error'>{errors.zone.message}</Message>
            )}
          </View>
          <View>
            <Text type='label'>Image</Text>
            <Controller
              name='image_url'
              control={control}
              render={({ field: { onChange } }) => (
                <DefectMonitoringImage
                  url={avatarUrl}
                  onUpload={(path: string) => {
                    onChange(path)
                    setAvatarUrl(path)
                  }}
                />
              )}
            />
            {errors.image_url && (
              <Message type='error'>{errors.image_url.message}</Message>
            )}
          </View>
          <View>
            <Text type='label'>Description</Text>
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={8}
                  placeholder='Enter a description of the defect.'
                />
              )}
            />
            {errors.description && (
              <Message type='error'>{errors.description.message}</Message>
            )}
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  innerContainer: {
    rowGap: 16,
  },
})
