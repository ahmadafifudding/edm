import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { Colors } from '@/constants/Colors'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { Text } from '@/components/ui/Text'

type InputFieldProps = TextInputProps & {
  icon?: keyof typeof Icons
}

export function InputField({
  style,
  secureTextEntry,
  icon,
  ...rest
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const PrefixIcon = Icons[icon ?? 'user']
  return (
    <View style={styles.container}>
      <PrefixIcon size={24} color={Colors.gray3} style={{ marginRight: 8 }} />
      <TextInput
        cursorColor={Colors.primary}
        style={[styles.input, style]}
        placeholderTextColor={Colors.light.placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        {...rest}
      />
      {secureTextEntry && (
        <Text
          style={styles.showPasswordText}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    height: 50,
    paddingVertical: 16,
  },
  showPasswordText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: Colors.primary,
  },
})
