import { View, Text, StyleSheet, Pressable } from 'react-native'
import IonIcons from '@expo/vector-icons/Ionicons'

export function ListItem(props) {

  return (
    <View style={(props.item.status) ? styles.itemDone : styles.item}>
      <Pressable onPress={() => props.editor(props.item)} >
        <Text>{props.item.name}</Text>
      </Pressable>

      {(props.item.status) ?
        <Pressable onPress={ () => props.delete(props.item.id) }>
          <IonIcons name="close-outline" color="black" size={20} />
        </Pressable>
        :
        <Pressable onPress={() => props.done(props.item)}>
          <IonIcons name="checkmark-outline" color="black" size={20} />
        </Pressable>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDone: {
    padding: 10,
    flex: 1,
    backgroundColor: "lightgreen",
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTextDone: {
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
    color: "black",
  }
})