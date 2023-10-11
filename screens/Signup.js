import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'

export function Signup( props ) {
  return(
    <View style={ styles.container }>
      <View style={ styles.form }>
        <Text style={ styles.title }>Register for an account</Text>
        <Text>Email</Text>
        <TextInput style={styles.input} placeholder="you@example.com"/>
        <Text>Password</Text>
        <TextInput style={styles.input} placeholder="minimum 8 characters"/>
        <Pressable style={ styles.button }>
          <Text style={ styles.button.text }>Sign up</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  form: {
    marginHorizontal: 10,
    backgroundColor: '#cccccc',
    marginTop: 30,
    padding: 5,
  },
  input: {
    backgroundColor: '#eeeeee',
    minWidth: 250,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333333',
    padding: 5,
    text: {
      color: '#eeeeee',
      textAlign: 'center',
    }
  }
})