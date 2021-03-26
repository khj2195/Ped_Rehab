import 'react-native-gesture-handler';
import React, {useState, useRef, useContext, useEffect} from 'react';
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
  Button,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchSelector from 'react-native-switch-selector';
import {SearchContext} from '../SearchProvider';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service'; //iOS 참조링크: https://dev-yakuza.posstree.com/ko/react-native/react-native-geolocation-service/

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const latList = [];
const longList = [];
const contactList = [];
const idList = []; //기관명 리스트
const addressList = [];
const markerImage = require('../assets/marker_round.png');
const selectedMarkerImage = require('../assets/marker_selected.png');

const MapScreen = () => {
  const {centerType, setCenterType} = useContext(SearchContext);
  const {location, setLocation} = useContext(SearchContext);
  const [currentLocLat, setCurrentLocLat] = useState(37.564362);
  const [currentLocLong, setCurrentLocLong] = useState(126.977011);
  const [rerender, setRerender] = useState(true);
  const [flag, setFlag] = useState(false);
  const [centerIndex, setCenterIndex] = useState(-1); //마커와 기관명을 매칭

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  const P3 = {latitude: 37.5017, longitude: 127.0046}; //서울성모
  const P4 = {latitude: 0, longitude: 0};

  const showMarkers = (array1, array2) => {
    console.log('Markers renewed');
    return array1.map((mem, key) => (
      <Marker
        coordinate={{latitude: array1[key], longitude: array2[key]}}
        key={key}
        onPress={() => {
          setCenterIndex(key);
          refRBSheet.current.open();
        }}
        image={centerIndex === key ? selectedMarkerImage : markerImage}
      />
    ));
  };

  async function firePromise() {
    try {
      const snap = await firestore()
        .collection('user')
        .doc(String(centerType))
        .collection(String(location))
        .get();
      snap.forEach((doc, key) => {
        // console.log(key,'번째 latitude:',doc.get('Location.latitude'));
        // console.log(key,'번째 longitude:',doc.get('Location.longitude'));
        latList.push(doc.get('lat'));
        longList.push(doc.get('long'));
        contactList.push(doc.get('연락처'));
        idList.push(doc.id);
      });
      console.log('inSize: ', latList.length);
      showMarkers(latList, longList);
    } catch (error) {
      throw error;
    }
    setFlag(true);
    setRerender(!rerender);
    console.log('Rerendered now');
    console.log('firePromise called');
    // console.log('inSize2: ',latList.length);
  }

  const refRBSheet = useRef();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    console.log('Ask location permission');
  }, []);

  useEffect(() => {
    console.log('flag before:', flag);
    if (!flag) {
      firePromise();
    }
    console.log('latList:', latList);
    // console.log('longList:', longList);
    // console.log('contactList:', contactList);
    // console.log('idList:', idList);
    console.log('flag after:', flag);

    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocLat(position.coords.latitude);
        setCurrentLocLong(position.coords.longitude);
        console.log('currentLat: ', currentLocLat);
        console.log('currentLong: ', currentLocLong);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {timeout: 15000, enableHighAccuracy: true, showLocationDialog: true},
    );
  }, [rerender]);

  useEffect(() => {
    latList.length = 0;
    longList.length = 0;
    contactList.length = 0;
    idList.length = 0;
    console.log('list initialized');
    if (flag) {
      firePromise();
    }
    console.log('size: ', latList.length);
  }, [centerType]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          marginLeft: windowWidth / 4,
          marginRight: windowWidth / 4,
          marginTop: 7,
        }}>
        <SwitchSelector
          initial={centerType === '병원' ? 0 : 1}
          onPress={(value) => {
            setCenterType(value), console.log(value);
          }}
          textColor="#FA8072" //'#7a44cf'
          selectedColor="#fff"
          buttonColor="#FA8072"
          borderColor="#FA8072"
          backgroundColor="#f0f0f0"
          height={30}
          fontSize={15}
          options={[
            {label: '병원', value: '병원'},
            {label: '사설센터', value: '사설센터'},
          ]}
        />
      </View>
      <View style={{flex: 14}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          // onMapReady={()=>{
          //   PermissionsAndroid.request(
          //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          //     ).then(granted => {
          //       alert(granted) // just to ensure that permissions were granted
          //       }
          //     )
          //   }
          // }
          showsUserLocation={true}
          showsMyLocationButton={true} //iOS에서 NSLocationWhenInUseUsageDescription key in Info.plist필요, 참조: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          zoomControlEnabled={true}
          onPress={(e) => {
            console.log(e.nativeEvent.coordinate);
            setCenterIndex(-1);
          }}
          initialRegion={{
            latitude: currentLocLat,
            longitude: currentLocLong,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{latitude: 37.564362, longitude: 126.977011}}
            image={require('../assets/marker_round.png')}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
          <Marker
            coordinate={{latitude: currentLocLat, longitude: currentLocLong}}
            image={require('../assets/current_location.png')}
          />
          {flag && showMarkers(latList, longList)}
        </MapView>
        {/* <NaverMapView style={{width: '100%', height: '100%'}}
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

      </NaverMapView> */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          // onOpen={setCenterIndex(-1)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          height={Dimensions.get('window').height / 4}>
          <Text style={{padding: 5, fontSize: 18, fontWeight: 'bold'}}>
            {idList[centerIndex]}
          </Text>
          <Text style={{padding: 5, fontSize: 15}}>
            {centerType} | 서울특별시 서초구 반포대로222
          </Text>
          <Text style={{padding: 5, fontSize: 15, color: 'blue'}}>
            {contactList[centerIndex]}
          </Text>
        </RBSheet>
      </View>
    </View>
  );
};

export default MapScreen;
