import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcons from '@expo/vector-icons/Ionicons'

import { Data } from './Data'
import { Profile } from './Profile'

const Tab = createBottomTabNavigator()

export function Home( props ) {
  const DataOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ color }) => <IonIcons name="home" color={color} size={20} />,
    title: "Home"
  }

  const ProfileOptions = {
    tabBarLabel: "Profile",
    tabBarIcon: ({ color }) => <IonIcons name="person" color={color} size={20} />
  }

  return (
    <Tab.Navigator initialRouteName="Data">
      <Tab.Screen name="Data" component={Data} options={ DataOptions } />
      <Tab.Screen name="Profile" component={Profile} options={ProfileOptions} />
    </Tab.Navigator>
  )
}