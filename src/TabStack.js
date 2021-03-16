import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CommunityScreen from './screens/CommunityScreen';
import MyPageScreen from './screens/MyPageScreen';
import Icons from 'react-native-vector-icons/dist/Ionicons';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
    let iconName, iconSize
    if (name === '홈') {
     iconName = focused? 'home' : 'home-outline'
    } else if (name === '지도') {
     iconName = focused? 'navigate' : 'navigate-outline'
    } else if (name === '커뮤니티') {
     iconName = focused? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
    } else if (name === 'My Page') {
     iconName = focused? 'person' : 'person-outline'
    }
    iconSize= 30
    return (
      <Icons 
       name = {iconName}
       size= {iconSize}
      />
    )
    }

const TabStack = () => {
    return(
        <Tab.Navigator
            initialRouteName ="홈"
            screenOptions = {({route})=>({
            tabBarLabel: route.name,
            tabBarIcon: ({focused})=> TabBarIcon(focused, route.name)
            })}  
        >
            <Tab.Screen name="홈" component={HomeScreen} />
            <Tab.Screen name="지도" component={MapScreen}/>
            <Tab.Screen name="커뮤니티" component={CommunityScreen}/>
            <Tab.Screen name="My Page" component={MyPageScreen}/>
        </Tab.Navigator>            
        )
}

export default TabStack;