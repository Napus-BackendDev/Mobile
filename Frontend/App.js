import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileLogInedScreen from './src/screens/ProfileLogInedScreen';
import DailyScreen from './src/screens/DailyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name='ProfileLogIned' component={ProfileLogInedScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Daily" component={DailyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
