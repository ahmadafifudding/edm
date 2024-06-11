import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '@/constants/Colors'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

export function ButtonLink({ href, ...rest }: Props) {
  return <Link href={href} style={styles.container} {...rest} />
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.gray1,
    borderRadius: 100,
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
})
