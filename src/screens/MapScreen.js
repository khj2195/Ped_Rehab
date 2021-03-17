import 'react-native-gesture-handler';
import React, {useState, useRef, useContext } from 'react';
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
import database from '@react-native-firebase/database';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen = () => {
    const {centerType, setCenterType} = useContext(SearchContext);
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const P3 = {latitude: 37.5017, longitude: 127.0046}

    const refRBSheet=useRef();
    return (
    <View style={{backgroundColor:'white'}}>      
      <View style={{marginLeft:windowWidth/4, marginRight:windowWidth/4, marginTop:10}}>
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
      <View style={{marginTop:10}}>
      <NaverMapView style={{width: '100%', height: '100%'}}
                    showsMyLocationButton={true}
                    center={{...P0, zoom: 16}}
                    onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                    onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                    onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
          <Marker coordinate={P3} onClick={() => refRBSheet.current.open()}/>
          {/* <Marker coordinate={P1} pinColor="blue" onClick={() => console.log('onClick! p1')}/>
          <Marker coordinate={P2} pinColor="red" onClick={() => console.log('onClick! p2')}/> */}
          {/* <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10}/> */}
          {/* <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')}/> */}
          {/* <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.log('onClick! circle')}/> */}
          {/* <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')}/> */}
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
              <Text style={{padding:5, fontSize:18, fontWeight:'bold'}}>서울성모병원</Text>
              <Text style={{padding:5, fontSize:15}}>  대학병원 | 서울특별시 서초구 반포대로222</Text>
              <Text style={{padding:5, fontSize:15, color:'blue'}}>  02-1588-1511</Text>
        </RBSheet>
      </View>
    </View>
    )
};

export default MapScreen;
