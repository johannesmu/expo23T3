import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
export function ListHeader( props ) {
  return (
    <View style={ styles.header }>
      <Text style={styles.text}>{ props.text }</Text>
      <Pressable style={styles.button}>
        <Text style={styles.button.text} >+</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  button: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: 30,
    height: 30,
    text: {
      fontSize: 20,
      color: "white",
    }
  }
})