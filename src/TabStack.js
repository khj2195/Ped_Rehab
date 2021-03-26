import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CommunityScreen from './screens/CommunityScreen';
import MyPageScreen from './screens/MyPageScreen';
import Icons from 'react-native-vector-icons/dist/Ionicons';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
  let iconName, fontSize;
  if (name === '홈') {
    iconName = focused
      ? require('./assets/home_click.png')
      : require('./assets/home.png');
  } else if (name === '지도') {
    iconName = focused
      ? require('./assets/placeholder_click.png')
      : require('./assets/placeholder.png');
  } else if (name === '커뮤니티') {
    iconName = focused
      ? require('./assets/chat_click.png')
      : require('./assets/chat.png');
  } else if (name === 'My Page') {
    iconName = focused
      ? require('./assets/user_click.png')
      : require('./assets/user.png');
  }
  return (
    <Image
      style={{
        width: 20,
        height: 20,
      }}
      source={iconName}
    />
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({route}) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
      })}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="My Page" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
