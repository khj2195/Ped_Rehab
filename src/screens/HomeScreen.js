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
  Dimensions
} from 'react-native';
import FormInput from '../components/FormInput';
import SwitchSelector from "react-native-switch-selector";
import {SearchContext} from '../SearchProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  
  const [centerName, setCenterName] = useState();
  const {centerType, setCenterType} = useContext(SearchContext);

  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>소아재활 통합 정보는</Text>
      <View style={{flexDirection:'row',alignItems:'flex-end', marginBottom:20}}>
        <Text style={styles.centralText}>           소통</Text>
        <Text style={styles.leftText}>에서 쉽고 빠르게</Text>
      </View>
      <View style={{marginLeft:windowWidth/4, marginRight:windowWidth/4}}>        
        <SwitchSelector
          initial={0}
          onPress={(value) => {setCenterType(value), console.log(value)}}
          textColor='#FA8072' //'#7a44cf'
          selectedColor='#fff'
          buttonColor='#FA8072'
          borderColor='#FA8072'
          backgroundColor='#f0f0f0'
          height={30}
          fontSize={15}
          options={[
            { label: "병원", value: "병원" }, 
            { label: "사설센터", value: "사설센터" } 
          ]}
        />
      </View>
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('ListSearch')
        }}
        style={{marginBottom:130}}>
        <FormInput
            labelValue={centerName}
            onChangeText={(userCenter) => setCenterName(userCenter)}
            placeholderText="병원 또는 센터를 검색하세요"
            iconType= {require('../assets/magnifier.png')}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  centralText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 25,
    fontWeight:'bold',
    marginBottom: 10,
    color: '#FA8072',
    textAlign: 'center',
  },
  leftText: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontFamily: 'Typo_SSiGothic180',
    fontSize: 19,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
});