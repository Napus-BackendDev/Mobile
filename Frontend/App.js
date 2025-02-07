import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigators/TabNavigator';
import ApplyMechanicScreen from './screens/Account/ApplyMechanicScreen';
import LogInScreen from './screens/Register/LogInScreen';

const Stack = createStackNavigator();

export default function App() { 
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'LogIn'}>
        <Stack.Screen
          name='LogIn'
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Tab'
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ApplyMechanic'
          component={ApplyMechanicScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer> 
  ); 
}
