import 'react-native-gesture-handler';
import React, {useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {SearchContext} from '../SearchProvider';
import firestore from '@react-native-firebase/firestore';

const InfoScreen = () => {
    // const {nameToShow, setNameToShow} = useContext(SearchContext);
    // const querySnapshot= firestore()
    // .collection('Centers')
    // .doc(nameToShow)
    // .get();
  return (
    <View>
        <Text>{nameToShow}</Text>
        {/* <Text>{querySnapshot.get('city1')}</Text> */}
    </View>
  );
};

export default InfoScreen;
