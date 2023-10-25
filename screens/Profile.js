import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../contexts/AuthContext'

export function Profile( props ) {
  const [user,setUser] = useState()

  const Auth = useContext( AuthContext )

  useEffect( () => {
    if( Auth.currentUser ) {
      setUser( Auth.currentUser )
    }
  }, [Auth])

  if( !user ) {
    return(
      <View style={ styles.container }>
        <Text>Getting user data...</Text>
      </View>
    )
  }
  else {
    return(
      <View style={ styles.container }>
        <Text>Hello {user.email}</Text>
        <Pressable style={styles.button} >
          <Text style={ styles.button.text }>Sign out</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginVertical: 15,
    padding: 8,
    backgroundColor: "#333333",
    borderRadius: 6,
    text: {
      color: "white",
      textAlign: "center",
    }
  }
})