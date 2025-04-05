import React from 'react';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

//Screens
import HomeScreen from './src/screens/HomeScreen';
import HoroscopeScreen from './src/screens/HoroscopeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileLogInedScreen from './src/screens/ProfileLogInedScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import StoreScreen from './src/screens/StoreScreen';
import SplashIntroScreen from './src/screens/SplashIntroScreen'; 


//Icons
import House from './assets/Icons/House.svg';
import Card from './assets/Icons/Square.svg';
import Profile from './assets/Icons/User.svg';
import ResultScreen from './src/screens/ResultScreen';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const ProfileComponent = ({ navigation }) => {
    if (isLoading) return null;
    return user ? (
      <ProfileLogInedScreen navigation={navigation} route={{ params: { userId: user.uid,hideBackButton: true } }} />
    ) : (
      <ProfileScreen navigation={navigation} />
    );
  };

  return(
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return <House width={30} height={30} fill={focused ? 'white' : '#73708B'} />;
          } else if (route.name === 'Store') {
            return <Card width={18} height={30} viewBox="0 100 100 100" fill={focused ? '#8174E8' : '#73708B'}  />;
          } else if (route.name === 'Profile') {
            return <Profile width={30} height={30} fill={focused ? '#8174E8' : '#73708B'} />;
          }
        },
        tabBarActiveTintColor: route.name == 'Home' ? 'white' : '#8174E8',
        tabBarInactiveTintColor: '#73708B',
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          height: 64,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontFamily: 'JosefinSans',
              fontSize: 10,
              fontWeight: '600',
              textTransform: 'uppercase',
              marginTop: 8,
            }
          }}
        />
        <Tab.Screen
          name='Store'
          component={StoreScreen}
          options={{
            tabBarLabel: 'Store',
            tabBarLabelStyle: {
              fontFamily: 'JosefinSans',
              fontSize: 10,
              fontWeight: '600',
              textTransform: 'uppercase',
              marginTop: 8,
            }
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileComponent}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              fontFamily: 'JosefinSans',
              fontSize: 10,
              fontWeight: '600',
              textTransform: 'uppercase',
              marginTop: 8,
            }
          }}
        />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans: require('./assets/fonts/JosefinSans.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen 
        name="Splash" 
        component={SplashIntroScreen} 
        options={{ headerShown: false }}
        />
          <Stack.Screen 
            name='TabNavigator' 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Login' 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Signup' 
            component={SignupScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='Horoscope'
            component={HoroscopeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='ProfileLogIned'
            component={ProfileLogInedScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='ResultScreen'
            component={ResultScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
