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
import FormInput from '../components/FormInput';
import SwitchSelector from "react-native-switch-selector";
import {SearchContext} from '../SearchProvider';

const HomeScreen = ({navigation}) => {
  
  const [centerName, setCenterName] = useState();
  const {centerType, setCenterType} = useContext(SearchContext);
  // const [centerType, setCenterType] = useState("병원");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.leftText}>소아재활</Text>
      <Text style={styles.leftText}>통합플랫폼에서</Text>
      <Text style={styles.leftText}>쉽고 빠르게 병원 찾기</Text>
      <SwitchSelector
        initial={0}
        onPress={(value) => {setCenterType(value), console.log(value)}}
        textColor='#f0aa98' //'#7a44cf'
        selectedColor='#fff'
        buttonColor='#f0aa98'
        borderColor='#f0aa98'
        height={40}
        fontSize={18}
        width={40}
        options={[
          { label: "병원", value: "병원" }, 
          { label: "사설센터", value: "사설센터" } 
        ]}
      />
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('ListSearch')
        }}>
        <FormInput
            labelValue={centerName}
            onChangeText={(userCenter) => setCenterName(userCenter)}
            placeholderText="Search"
            iconType="search1"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    paddingTop: 120
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  centralText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 22,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
  leftText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 22,
    marginBottom: 10,
    color: '#051d5f',
    marginLeft: 33,
  },
});