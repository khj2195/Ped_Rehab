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
  // const [centerType, setCenterType] = useState("병원");
  const {centerType, setCenterType} = useContext(SearchContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormInput
            labelValue={centerName}
            onChangeText={(userCenter) => setCenterName(userCenter)}
            placeholderText="Search"
            iconType="search1"
            autoCapitalize="none"
            autoCorrect={false}
            editable={true}
        />
      <View style={{flexDirection:'row'}}>
        <Button
          title= {centerType}
          onPress= {()=>setTypePopup(!typePopup)}
        />
        <Button
          title= "지역별"
          onPress= {()=>setLocationPopup(!locationPopup)}
        />
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
            onPress={()=>{setLocationPopup(false)}}
            />
          <Button
            title="경기도"
            onPress={()=>{setLocationPopup(false)}}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ListSearchScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20
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
});