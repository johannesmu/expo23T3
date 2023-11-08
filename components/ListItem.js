import { View, Text, StyleSheet, Pressable } from 'react-native'

export function ListItem ( props ) {
  return (
    <View>
      <Pressable>
        <Text>{ props.item.name }</Text>
      </Pressable>
    </View>
  )
}