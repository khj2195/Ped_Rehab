import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListSearchScreen from './screens/ListSearchScreen';
import TabStack from './TabStack';

const Stack = createStackNavigator();
const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={TabStack}
            options = {{
                title: 'SoTong',
            }}
            />
            <Stack.Screen 
            name="ListSearch" 
            component={ListSearchScreen}
            options = {{title: '세부검색'}}
            />
        </Stack.Navigator>            
        )
}

export default AppStack;