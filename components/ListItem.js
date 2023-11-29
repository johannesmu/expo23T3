import { View, Text, StyleSheet, Pressable } from 'react-native'

import { DateDisplay } from './DateDisplay'

export function ListItem ( props ) {
  const itemDate = props.item.created
  return (
    <View style={ styles.item }>
      <Pressable onPress={ () => props.editor(props.item) } >
        <Text>{ props.item.name }</Text>
        <DateDisplay date={ itemDate } />
      </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
  item: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    margin: 5,
  }
})