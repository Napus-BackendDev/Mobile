import React from "react";
import { StyleSheet, View, Text, Image  } from "react-native-web";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen";
import FixListScreen from "../screens/FixList/FixListScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import AccountScreen from "../screens/Account/AccountScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return (
        <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{ 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.view, { backgroundColor: focused ? 'white' : '' }]}>
                        <Image source={require('../assets/NavigatorImage/Home.png')} style={styles.icon}></Image>
                        <Text style={styles.label}>Home</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='FixList' component={FixListScreen} options={{ 
                headerShown: false ,
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.view, { backgroundColor: focused ? 'white' : '' }]}>
                        <Image source={require('../assets/NavigatorImage/List.png')} style={styles.icon}></Image>
                        <Text style={styles.label}>Fix List</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Notification' component={NotificationScreen} options={{ 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.view, { backgroundColor: focused ? 'white' : '' }]}>
                        <Image source={require('../assets/NavigatorImage/Notification.png')} style={styles.icon}></Image>
                        <Text style={styles.label}>Notification</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Account' component={AccountScreen} options={{ 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.view, { backgroundColor: focused ? 'white' : '' }]}>
                        <Image source={require('../assets/NavigatorImage/Profile.png')} style={styles.icon}></Image>
                        <Text style={styles.label}>Account</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#F9A825',
        height: 90,
        paddingTop: 20,
    },
    view: {
        width: 60,
        height: 60,
        alignItems: 'center',
        borderRadius: 18,
    },
    label: {
        color: 'black',
        fontSize: 12,
    },
    icon: {
        width: 30, 
        height: 30, 
        marginTop: 7,
    },
});