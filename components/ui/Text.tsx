import { Colors } from '@/constants/Colors'
import {
  Text as DefaultText,
  StyleSheet,
  TextProps as DefaultTextProps,
} from 'react-native'
export type TextProps = DefaultTextProps & {
  type?:
    | 'default'
    | 'heading'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'label'
}
export function Text({ style, type = 'default', ...rest }: TextProps) {
  return (
    <DefaultText
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'heading' ? styles.heading : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'label' ? styles.label : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 17,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 36,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Inter_400Regular',
    color: Colors.gray4,
  },
  link: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  label: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Inter_500Medium',
    marginBottom: 6,
  },
})
