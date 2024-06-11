import { Colors } from '@/constants/Colors'
import { Link as ExpoLink } from 'expo-router'
import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'

type LinkProps = Omit<ComponentProps<typeof ExpoLink>, 'href'> & {
  href: string
  color?: string
}

export function Link({
  href,
  style,
  color = Colors.white,
  ...rest
}: LinkProps) {
  return (
    <ExpoLink href={href} style={[styles.link, { color }, style]} {...rest} />
  )
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter_600SemiBold',
  },
})
