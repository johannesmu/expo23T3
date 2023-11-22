import { View, Text } from 'react-native'
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
      default:
        break
    }
  }, [ props.errorMsg ] )

  return(
    <View>
      <Text>
        {message}
      </Text>
    </View>
  )
}