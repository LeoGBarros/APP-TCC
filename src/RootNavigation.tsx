import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import Onboarding from './screens/Onboarding'
import SignUp from './screens/SignUp'
import Home from '@Screens/Home/Home'
import Profile from '@Screens/Profile/Profile'
import SignIn from '@Screens/SignIn/SignIn'
import SearchServices from '@Screens/SearchServices/SearchServices'
import AddHouse from '@Screens/AddHouse/AddHouse'
import ProposalsStackScreen from '@Screens/Proposals'
import { Entypo } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={NavBarNavigation} />
        <Stack.Screen name="AddHouse" component={AddHouse} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const NavBarNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'

            return <MaterialIcons name={'home'} size={size} color={color} />
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'

            return <MaterialIcons name={'account-circle'} size={size} color={color} />
          } else if (route.name === 'SearchServices') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'

            return <MaterialIcons name={'search'} size={size} color={color} />
          } else if (route.name === 'ProposalsStack') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'

            return <Entypo name="text-document" size={size} color={color} />
          }
          // colocar mais ifs caso tenha mais itens na navbar
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 60,
        },
        tabBarActiveTintColor: '#3030C2',
        tabBarInactiveTintColor: '#151553',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="ProposalsStack" component={ProposalsStackScreen} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="SearchServices" component={SearchServices} />
    </Tab.Navigator>
  )
}

const AuthenticatedNavigation = () => {
  return <></>
}

export default RootNavigation
