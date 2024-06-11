import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { Message } from '@/components/ui/Message'
import { SignUpSchema, signUpSchema } from '@/validation'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

export function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpSchema) {
    const { name, email, password } = data
    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (error) {
      Alert.alert('Error', error.message)
      return
    }

    if (!session) {
      Alert.alert(
        'Confirm your email',
        'Please check your email to confirm your account.'
      )
      return
    }
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginBottom: 16 }}>
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                icon='user'
                placeholder='Fatin Aemeelia'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Message type='error'>{errors.name.message}</Message>}
        </View>
        <View style={{ marginBottom: 16 }}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                icon='envelope'
                placeholder='ameelia@example.com'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Message type='error'>{errors.email.message}</Message>
          )}
        </View>
        <View style={{ marginBottom: 16 }}>
          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                icon='lock'
                placeholder='Enter a strong password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Message type='error'>{errors.password.message}</Message>
          )}
        </View>
        <View style={{ marginBottom: 40 }}>
          <Controller
            name='passwordConfirmation'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                icon='lock'
                placeholder='Re-enter your password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.passwordConfirmation && (
            <Message type='error'>
              {errors.passwordConfirmation.message}
            </Message>
          )}
        </View>
        <Button
          label='Sign Up'
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 32,
  },
})
