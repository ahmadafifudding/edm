import { Colors } from '@/constants/Colors'
import { View, StyleSheet } from 'react-native'

export function Separator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    borderColor: Colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
})
