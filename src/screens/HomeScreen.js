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
      <View>
      <Image style={{
        width: 35, 
        height: 35,
        marginTop :110

        }} 
        source={require("../assets/logo_v1.png")}/>
      </View>
      <View style = {{
        // backgroundColor : 'yellow',
        width : '100%',
        marginTop : 30
    }}>
      <Text style={{
        fontFamily:"jalnan",
        fontSize : 25,
        textAlign : 'center',
        color : '#272727',
        lineHeight : 40
        }}>소통하세요 ;)</Text>
        <Text style={styles.centralText}>소아재활 정보 검색</Text>
      </View>
      <View style={{
        width : 150,
        height : 35,
        marginTop : 30,
        // backgroundColor : 'green'
        }}>        
        <SwitchSelector //병원 or 센터 중 택일하는 스위치 버튼
          initial={centerType==='병원'? 0 : 1}
          onPress={(value) => {setCenterType(value), console.log(value)}}

          textColor='#FA8072' //'#7a44cf'
          selectedColor='#fff'
          buttonColor='#FA8072'
          backgroundColor='#ffd6d1'
          height={35}
          fontSize={16}
          options={[
            { label: "병원", value: "병원" }, 
            { label: "사설센터", value: "사설센터" } 
          ]}
        />
      </View>
      <View style={{
        backgroundColor : 'white',
        marginTop : 10, 
        width : 0.8*windowWidth,
        height : 60,
        justifyContent : 'center'
        }}>
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('ListSearch')
          
        }}
        // style={{backgroundColor : 'red'}}
        >
        <FormInput
            labelValue={centerName}
            onChangeText={(userCenter) => setCenterName(userCenter)}
            placeholderText="병원 또는 센터를 검색하세요."
            iconType= {require('../assets/magnifier.png')}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems :'center'
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  centralText: {
    fontFamily: 'SD_Gothic B',
    fontSize: 28,
    fontWeight:'bold',
    marginBottom: 10,
    color: '#272727',
    textAlign: 'center'
  },
  leftText: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontFamily: 'SD_Gothic B',
    fontSize: 19,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
});