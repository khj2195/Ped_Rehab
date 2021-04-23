import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ListSearchScreen from './screens/ListSearchScreen';
import TabStack from './TabStack';
import InfoScreen from './screens/InfoScreen';

const Stack = createStackNavigator();
const AppStack = () => { //screen들간의 구조를 선언
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabStack}
        options={{
          // title: 'SoTong',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListSearch"
        component={ListSearchScreen}
        options={{title: '세부검색'}}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        // options={{title: '세부검색'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
