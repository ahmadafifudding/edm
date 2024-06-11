import { Colors } from '@/constants/Colors'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'

type TextAreaProps = TextInputProps & {}

export function TextArea({ style, ...rest }: TextAreaProps) {
  return (
    <TextInput
      style={[styles.container, style]}
      textAlignVertical='top'
      cursorColor={Colors.primary}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray1,
    padding: 16,
    fontFamily: 'Inter_400Regular',
  },
})
