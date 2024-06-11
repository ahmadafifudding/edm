import { Colors } from '@/constants/Colors'
import { Text, TextProps, StyleSheet } from 'react-native'

type MessageProps = TextProps & {
  type?: 'error' | 'success'
}
export function Message({ type = 'error', style, ...rest }: MessageProps) {
  return (
    <Text
      style={[
        styles.message,
        type === 'error' ? styles.error : styles.success,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  error: {
    color: Colors.error,
  },
  success: {
    color: Colors.success,
  },
})
