import 'react-native-gesture-handler';
import React, {useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  Button
} from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from 'react-native-nmap';
import RBSheet from "react-native-raw-bottom-sheet";
import SwitchSelector from "react-native-switch-selector";
import {SearchContext} from '../SearchProvider';
import firestore from '@react-native-firebase/firestore';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const latList=[];
const longList=[];
const contactList=[];
const idList=[]; //기관명 리스트
const addressList=[];

const MapScreen = () => {
    const {centerType, setCenterType} = useContext(SearchContext);
    const {location, setLocation} = useContext(SearchContext);
    const [rerender, setRerender] =useState(true);
    const [flag, setFlag]= useState(false);
    const [centerIndex, setCenterIndex] = useState(0); //마커와 기관명을 매칭

    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const P3 = {latitude: 37.5017, longitude: 127.0046}; //서울성모
    const P4 = {latitude: 0, longitude: 0};

    const showMarkers = (array1, array2) => {
      console.log('Markers renewed!');
      return array1.map((mem,key)=>(
        <Marker coordinate={{latitude: array1[key], longitude: array2[key]}} 
                key={key} 
                onClick={()=>{
                  setCenterIndex(key);
                  refRBSheet.current.open();
                }} />
      ))
    }

    async function firePromise (){
      try{
        const snap= await firestore()
        .collection('user')
        .doc(String(centerType))
        .collection(String(location))
        .get()
      snap.forEach((doc, key)=>{
        // console.log(key,'번째 latitude:',doc.get('Location.latitude'));
        // console.log(key,'번째 longitude:',doc.get('Location.longitude'));
        latList.push(doc.get('lat'));
        longList.push(doc.get('long'));
        contactList.push(doc.get('Contact'));
        idList.push(doc.id);
      })
        console.log('inSize: ',latList.length);
        showMarkers(latList,longList);
      } catch(error){
        throw error;
      }
      setFlag(true);
      setRerender(!rerender);
      console.log('Rerendered now!');
      // console.log('firePromise called');
      // console.log('inSize2: ',latList.length);
    }

    const refRBSheet=useRef(); 

  
    useEffect(()=>{
      console.log('flag before:', flag);
      if(!flag){
        firePromise();
      }
      console.log('latList:', latList);
      // console.log('longList:', longList);
      // console.log('contactList:', contactList);
      // console.log('idList:', idList);
      console.log('flag after:', flag);
    });

    useEffect(()=>{
      latList.length=0;
      longList.length=0;
      contactList.length=0;
      idList.length=0;
      console.log('list initialized');
      if(flag){firePromise();};
      console.log('size: ', latList.length);
    },[centerType]);

    return (
    <View style={{backgroundColor:'white'}}>      
      <View style={{marginLeft:windowWidth/4, marginRight:windowWidth/4, marginTop:10}}>
        <SwitchSelector
          initial={centerType==='병원'? 0 : 1}
          onPress={(value) => {
            setCenterType(value), 
            console.log(value)}}
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
      <View style={{marginTop:10}}>
      <NaverMapView style={{width: '100%', height: '100%'}}
                    showsMyLocationButton={true}
                    center={{...P0, zoom: 16}}
                    onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                    onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                    onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
                    >
          <Marker coordinate={P0} onClick={() => 
                    {
                      refRBSheet.current.open()
                      console.log('contactList[1]:', contactList[1]);
                      console.log('idList:', idList[0]);
                    }}
          />
          {flag && showMarkers(latList,longList)}

      </NaverMapView>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
          height={Dimensions.get('window').height/4}
          > 
              <Text style={{padding:5, fontSize:18, fontWeight:'bold'}}>
                      {idList[centerIndex]}
              </Text>
              <Text style={{padding:5, fontSize:15}}>  {centerType} | 서울특별시 서초구 반포대로222</Text>
              <Text style={{padding:5, fontSize:15, color:'blue'}}>
                {contactList[centerIndex]}
              </Text>
        </RBSheet>
      </View>
    </View>
    )
};

export default MapScreen;
