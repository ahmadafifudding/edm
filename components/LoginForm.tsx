import { Link, router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { Text } from '@/components/ui/Text'
import { Message } from '@/components/ui/Message'
import { SignInSchema, signInSchema } from '@/validation'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { zodResolver } from '@hookform/resolvers/zod'

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInSchema) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      Alert.alert('Error', error.message)
      return
    }

    router.push('/')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text type='heading'>Login</Text>
        <Text style={{ color: Colors.gray4 }}>Please sign in to continue</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              icon='user'
              placeholder='ameelia@example.com'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='email-address'
            />
          )}
        />
        {errors.email && <Message type='error'>{errors.email.message}</Message>}
      </View>
      <View style={{ marginBottom: 43 }}>
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
      <Button
        label='Sign in'
        onPress={handleSubmit(onSubmit)}
        style={{ marginBottom: 16 }}
        isLoading={isSubmitting}
      />
      <View style={styles.footerContainer}>
        <Text type='subtitle'>Don't have an account?</Text>
        <Link href='/sign-up' style={styles.link}>
          {` Create account`}
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 32,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  link: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
})
