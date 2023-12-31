import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
// contexts
import { AuthContext } from './contexts/AuthContext'
import { DbContext } from './contexts/DbContext'
import { StorageContext } from './contexts/StorageContext'
// firebase
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
// react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// screens
import { Signup } from './screens/Signup'
import { Signin } from './screens/Signin'
import { Home } from './screens/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  const FBapp = initializeApp(firebaseConfig)
  const FBauth = getAuth(FBapp)
  const FBdb = getFirestore(FBapp)
  const FBstorage = getStorage(FBapp)
  // state
  const [auth, setAuth] = useState()

  // authentication observer
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      // user is authenticated
      setAuth(user)
    }
    else {
      // user is not authenticated
      setAuth(null)
    }
  })

  const Login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(FBauth, email, password)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  }

  return (
    <AuthContext.Provider value={FBauth}>
      <DbContext.Provider value={FBdb}>
        <StorageContext.Provider value={FBstorage}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerBackVisible: false }}>
              <Stack.Screen name="Sign up">
                {(props) => <Signup />}
              </Stack.Screen>
              <Stack.Screen name="Sign in">
                {(props) => <Signin handler={Login} />}
              </Stack.Screen>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </StorageContext.Provider>
      </DbContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
