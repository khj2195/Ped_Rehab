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
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from 'react-native-nmap';

const MapScreen = () => {
  
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const test = "hi";

    return (
      <NaverMapView style={{width: '100%', height: '100%'}}
                    showsMyLocationButton={true}
                    center={{...P0, zoom: 16}}
                    onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                    onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                    onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
          <Marker coordinate={P0} onClick={() => console.log('onClick! p0')}/>
          <Marker coordinate={P1} pinColor="blue" onClick={() => console.log('onClick! p1')}/>
          <Marker coordinate={P2} pinColor="red" onClick={() => console.log('onClick! p2')}/>
          <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10}/>
          <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')}/>
          <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.log('onClick! circle')}/>
          <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')}/>
      </NaverMapView>
    )
};

export default MapScreen;
