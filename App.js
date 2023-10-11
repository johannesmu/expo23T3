import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// firebase
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
// react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// screens
import { Signup } from './screens/Signup'

const Stack = createNativeStackNavigator()

export default function App() {
  const FBapp = initializeApp( firebaseConfig )
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign up" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
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
