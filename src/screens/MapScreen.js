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

const treatmentTypes = [
  '운동재활치료',
  '감각재활치료',
  '놀이치료',
  '행동치료',
  '언어치료',
  '심리치료',
  '심리운동치료',
  '청능치료',
  '음악치료',
  '미술치료',
];
const treatmentStates = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

const MapScreen = () => {
  const {centerType, setCenterType} = useContext(SearchContext);
  const {location, setLocation} = useContext(SearchContext);
  // const [currentLocLat, setCurrentLocLat] = useState(37.564362);
  // const [currentLocLong, setCurrentLocLong] = useState(126.977011);
  const [currentLocLat, setCurrentLocLat] = useState(0);
  const [currentLocLong, setCurrentLocLong] = useState(0);
  const [rerender, setRerender] = useState(true);
  const [flag, setFlag] = useState(false);
  const [centerIndex, setCenterIndex] = useState(-1); //마커와 기관명을 매칭
  const [careType, setCareType] = useState([]);
  const {treatment, setTreatment} = useContext(SearchContext);

  const treatmentBottomSheet = useRef();

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
      // showMarkers(latList, longList);
    } catch (error) {
      throw error;
    }
    setFlag(true);
    setRerender(!rerender);
    console.log('Rerendered now');
    console.log('firePromise called');
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, flexDirection:'row'}} onPress={() => {}}>
          <View style={{flex: 5, paddingTop: 5, paddingLeft: 5}}>
            <Text>지역별</Text>
          </View>
          <View style={{flex: 1, paddingTop: 7}}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../assets/arrow_below.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => {
            treatmentBottomSheet.current.open();
          }}>
          <View style={{flex: 5, paddingTop: 5, paddingLeft: 5}}>
            <Text>치료과목</Text>
          </View>
          <View style={{flex: 1, paddingTop: 7}}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../assets/arrow_below.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 14}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation={true}
          showsMyLocationButton={true} //iOS에서 NSLocationWhenInUseUsageDescription key in Info.plist필요, 참조: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          zoomControlEnabled={true}
          onPress={(e) => {
            console.log(e.nativeEvent.coordinate);
            setCenterIndex(-1);
          }}
          initialRegion={{
            latitude: currentLocLat > 0 ? currentLocLat : 37.564362,
            longitude: currentLocLong > 0 ? currentLocLong : 126.977011,
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
          {flag && showMarkers(latList, longList)}
        </MapView>

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

      {/* 치료과목 선택 */}
      <RBSheet
        ref={treatmentBottomSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={(2 * Dimensions.get('window').height) / 3}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              borderColor: '#FA8072',
              borderBottomWidth: 1,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <View style={{flex: 8}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'normal',
                  paddingLeft: 20,
                  textAlign: 'center',
                }}>
                치료과목 선택
              </Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  // setCarePopup(false);

                  //완료 누르면 context의 Treatment를 treatmentstates가 false인 member들로 설정
                  {
                    // careType.map((mem, idx) => {
                    //   setTreatment([...treatment, mem]);
                    // });
                    setTreatment(careType);
                  }
                  console.log('context treatment: ', treatment);
                  treatmentBottomSheet.current.close();
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    color: '#566573',
                  }}>
                  완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 선택된 치료과목 표시 */}
          {careType.length > 0 && (
            <View
              style={{
                flex: 4,
                flexDirection: 'row',
                paddingTop: 5,
                borderColor: '#FA8072',
                borderBottomWidth: 1,
                marginLeft: 10,
                marginRight: 10,
              }}>
              {careType.map((mem, idx) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {width: 16 * treatmentTypes[mem].length + 4},
                    ]}
                    key={idx}
                    onPress={() => {
                      //다시 누르면 사라지도록
                      setCareType([
                        ...careType.slice(0, idx),
                        ...careType.slice(idx + 1),
                      ]);
                      treatmentStates[mem] = !treatmentStates[mem];
                      console.log(careType[idx]);
                      console.log(treatmentTypes[mem].length);
                    }}>
                    <Text style={{fontSize: 15, color: '#FA8072'}}>
                      {treatmentTypes[mem]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {/* 전체 치료과목 표시 */}
          {treatmentStates.map((mem, idx) => {
            return (
              idx % 2 === 0 && (
                <View style={styles.horizontalRegion} key={idx}>
                  <View style={{flex: 1, justifyContent: 'center'}} key={idx}>
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => {
                        treatmentStates[idx] = !treatmentStates[idx]; //안 눌렸을 땐 누르는 순간 false로 바뀌고 careType에 0 추가
                        if (!treatmentStates[idx]) {
                          setCareType([idx, ...careType]);
                        } else {
                          //이미 눌려있다면 해당하는 놈만 쏙 빼
                          setCareType([
                            ...careType.slice(0, careType.indexOf(idx)),
                            ...careType.slice(careType.indexOf(idx) + 1),
                          ]);
                        }
                        console.log('careType: ', careType);
                        console.log(
                          'treatmentStates[',
                          idx,
                          ']: ',
                          treatmentStates[idx],
                        );
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: treatmentStates[idx] ? '#000' : '#FA8072'},
                        ]}>
                        {treatmentTypes[idx]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{flex: 1, justifyContent: 'center'}}
                    key={idx + 1}>
                    <TouchableOpacity
                      key={idx + 1}
                      style={styles.optionButton}
                      onPress={() => {
                        treatmentStates[idx + 1] = !treatmentStates[idx + 1]; //안 눌렸을 땐 누르는 순간 false로 바뀌고 careType에 0 추가
                        if (!treatmentStates[idx + 1]) {
                          setCareType([idx + 1, ...careType]);
                        } else {
                          //이미 눌려있다면 해당하는 놈만 쏙 빼
                          setCareType([
                            ...careType.slice(0, careType.indexOf(idx + 1)),
                            ...careType.slice(careType.indexOf(idx + 1) + 1),
                          ]);
                        }
                        console.log('careType: ', careType);
                        console.log(
                          'treatmentStates[',
                          idx + 1,
                          ']: ',
                          treatmentStates[idx + 1],
                        );
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: treatmentStates[idx + 1]
                              ? '#000'
                              : '#FA8072',
                          },
                        ]}>
                        {treatmentTypes[idx + 1]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            );
          })}
          <View style={{flex: 12, backgroundColor: '#EEEEE8'}} />
        </View>
        {/* </Modal> */}
      </RBSheet>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'white',
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
  button: {
    height: 33,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#FA8072',
    marginRight: 5,
    marginTop: 3,
  },
  optionText: {
    fontSize: 15,
    paddingLeft: 15,
  },
  optionButton: {
    borderColor: '#FA8072',
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
  },
  horizontalRegion: {flex: 4, flexDirection: 'row', backgroundColor: '#EEEEE8'},
});
