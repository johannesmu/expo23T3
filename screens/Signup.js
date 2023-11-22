import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { DbContext } from '../contexts/DbContext'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from 'firebase/firestore'

import { ErrorMessage } from '../components/ErrorMessage'

export function Signup( props ) {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[username,setUsername] = useState('')

  const[validEmail, setValidEmail ] = useState(false)
  const[validPassword, setValidPassword] = useState(false)
  const[validUsername, setValidUsername] = useState(false)

  const[ error, setError ] = useState()

  const navigation = useNavigation()
  const Auth = useContext(AuthContext)
  const db = useContext(DbContext)

  useEffect( () => {
    if( Auth.currentUser ) {
      navigation.reset( { index: 0, routes: [ {name: "Home"} ] })
    }
  })

  // check the value of email
  useEffect( () => {
    if( email.indexOf('@') > 0 ) {
      setValidEmail( true )
    }
    else {
      setValidEmail( false )
    }
  }, [email])

  // check the value of password
  useEffect( () => {
    if( password.length >= 8 ) {
      setValidPassword( true )
    }
    else {
      setValidPassword( false )
    }
  }, [password])

  // check the value of username
  const allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890"
  const isAllowed = ( str ) => {
    let errors = []
    const chars = str.toLowerCase().split('')
    for( let i=0; i< chars.length; i++ ) {
      if( !allowedChars.includes( chars[i]) ) {
        errors.push({character: chars[i], position: i })
      }
    }
    if( errors.length > 0 ) {
      //return { status: false, errors: errors, message: `${errors.length} illegal characters found`}
      return false
    }
    else {
      //return { status: true, message: "all characters are legal" }
      return true
    }
  }

  useEffect( () => {
    if( username.length > 3 && isAllowed(username) ) {
      setValidUsername( true )
    }
  }, [username])

  

  const submitHandler = () => {
    props.handler( email, password )
    .then( ( userCredential ) => {
      // sign up successful
      // write the username into Firestore
      //console.log(userCredential.user.uid)
      const docRef = doc(db,"things", userCredential.user.uid )
      setDoc(docRef, { email: user.email, name: username, profileImg: "default.png"} )
      .then((res) => console.log(res) )
    })
    .catch( (error) => {
      setError( error.code)
      // wait 3000 milliseconds and then reset the error state to null
      setTimeout( () => { 
        setError(null)
      }, 3000 )

    } )
    // reset the fields
    setEmail('')
    setPassword('')
  }

  return(
    <View style={ styles.container }>
      <View style={ styles.form }>
        <Text style={ styles.title }>Register for an account</Text>
        <Text>User Name</Text>
        <TextInput 
          style={styles.input} 
          value={username}
          placeholder="letter and numbers only"
          onChangeText={ (val) => setUsername(val) }
        />
        <Text>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="you@example.com"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <Text>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="minimum 8 characters"
          secureTextEntry={true}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
        <Pressable 
          style={ (validEmail && validPassword && validUsername ) ? styles.button : styles.disabledButton} 
          onPress={() => submitHandler()}
          disabled={ (validEmail && validPassword) ? false : true }
        >
          <Text style={ styles.button.text }>Sign up</Text>
        </Pressable>
        <ErrorMessage errorMsg={error} />
        <Pressable style={styles.authlink} onPress={() => navigation.navigate("Sign in")}>
          <Text style={styles.authlink.text}>Go to sign in</Text>
        </Pressable>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666666',
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
    borderRadius: 10,
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
  },
  disabledButton: {
    backgroundColor: '#666666',
    padding: 5,
    text: {
      color: '#eeeeee',
      textAlign: 'center',
    }
  },
  authlink: {
    marginTop: 10,
    text: {
      textAlign: "center"
    }
  }
})