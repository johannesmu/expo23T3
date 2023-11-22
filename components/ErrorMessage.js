import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect} from 'react'

export function ErrorMessage( props ) {
  const [ message, setMessage ] = useState()

  useEffect( () => {
    if( !props.errorMsg ) {
      setMessage(null)
      return
    }
    switch( props.errorMsg ) {
      case "auth/email-already-in-use" :
        setMessage("The email address is already used")
        break
      case "auth/invalid-login-credentials" :
        setMessage("Credentials used are not valid")
        break
      default:
        break
    }
  }, [ props.errorMsg ] )

  return(
    <View style={ (message) ? styles.panel : null }>
      <Text>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "yellow",
    padding: 5,
    text: {
      textAlign: "center",
    }
  }
})