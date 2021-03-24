import React, {useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button,
  Modal
} from 'react-native';
import FormInput from '../components/FormInput';
import {SearchContext} from '../SearchProvider';


const ListSearchScreen = () => {
  const [centerName, setCenterName] = useState("");
  const [typePopup, setTypePopup] = useState(false);
  const [locationPopup, setLocationPopup]=useState(false);
  const {centerType, setCenterType} = useContext(SearchContext);
  const {location, setLocation} = useContext(SearchContext);


  return (
    <View style={styles.container}>
      <View style={{flex:1, alignItems: 'center',}}>
        <FormInput
            labelValue={centerName}
            onChangeText={(userCenter) => setCenterName(userCenter)}
            placeholderText="병원 또는 센터를 검색하세요"
            iconType= {require('../assets/magnifier.png')}
            autoCapitalize="none"
            autoCorrect={false}
            editable={true}
        />
      </View>
      {/* 병원 유형 */}
      <View style={{flex:7, flexDirection:'row'}}>
        <TouchableOpacity 
          style={styles.button_2letter}
          onPress={()=>{setTypePopup(true)}}
        >
          <Text style={{fontSize:16, color:'#FA8072'}}>{centerType}</Text>
        </TouchableOpacity>   
        <TouchableOpacity 
          style={styles.button_3letter}
          onPress={()=>{setLocationPopup(true)}}
        >
          <Text style={{fontSize:16, color:'#FA8072'}}>지역별</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={typePopup}
        animationType='slide'
      >
        <View>
          <Button
            title="병원"
            onPress={()=>{setCenterType("병원"), setTypePopup(false)}}
            />
          <Button
            title="사설센터"
            onPress={()=>{setCenterType("사설센터"), setTypePopup(false)}}
          />
        </View>
      </Modal>
      <Modal
        visible={locationPopup}
        animationType='slide'
      >
        <View>
          <Button
            title="서울시"
            onPress={()=>{
              setLocation('서울시');
              setLocationPopup(false);
            }}
            />
          <Button
            title="제주특별자치도"
            onPress={()=>{
              setLocation('제주특별자치도');
              setLocationPopup(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ListSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor:'white'
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
  button_2letter : {height:33, width:42, backgroundColor:'white',borderWidth:1, padding:5,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderColor:'#FA8072',
  },
  button_3letter : {height:33, width:58, backgroundColor:'white',borderWidth:1, padding:5,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderColor:'#FA8072',
  },
  button_4letter : {height:33, width:74, backgroundColor:'white',borderWidth:1, padding:5,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderColor:'#FA8072',
  },
});