import { Colors } from '@/constants/Colors'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type ButtonProps = TouchableOpacityProps & {
  label: string
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  pill?: boolean
}
export function Button({
  label,
  isLoading,
  disabled,
  variant = 'primary',
  pill = true,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading || disabled}
      {...rest}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? Colors.primaryLight
              : variant === 'primary'
              ? Colors.primary
              : Colors.gray1,
          },
          { borderRadius: pill ? 24 : 8 },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator
            color={variant === 'primary' ? Colors.white : Colors.primary}
          />
        ) : (
          <Text
            style={[
              styles.label,
              {
                color: variant === 'primary' ? Colors.white : Colors.primary,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  primary: {
    backgroundColor: Colors.gray1,
  },
  secondary: {
    backgroundColor: Colors.gray1,
  },
})
