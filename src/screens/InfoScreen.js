import 'react-native-gesture-handler';
import React, {useState, useContext, useEffect, useFocusEffect, useLayoutEffect} from 'react';
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
// 사진 업로드는 firestore가 아닌 Firebase Storage로 해야 함

const address = [];

const InfoScreen = () => {
  const {nameToShow, setNameToShow} = useContext(SearchContext);
  const [thisAddress, setThisAddress]=useState([]);

  useLayoutEffect(() => {
    address.length=0;
    async function firePromise() {
      try {
        const querySnapshot = await firestore()
          .collection('Centers')
          .doc(nameToShow)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (address.length < 3) {
                address.push(doc.get('city1'));
                address.push(doc.get('city2'));
              }
            }
          });
          setThisAddress(address);
      } catch (error) {
        throw error;
      }
    }
    firePromise();
  }, []);
  return (
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 2, padding: 20, alignItems: 'center'}}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../assets/logo_v1.png')}
        />
      </View>
      <View style={{flex: 1, padding:20}}>
        <Text style={{fontSize: 18}}>{nameToShow}</Text>
        {console.log('adress: ',thisAddress)}
        {thisAddress.map((mem, idx) => {
          return (
            <Text style={{fontSize: 16, padding:5}} key={idx}>
              {mem}
            </Text>
          );
        })}
      </View>
      <View style={{flex: 2}}></View>
    </ScrollView>
  );
};

export default InfoScreen;
