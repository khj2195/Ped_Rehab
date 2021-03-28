import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  Dimensions,
} from 'react-native';
import FormInput from '../components/FormInput';
import {SearchContext} from '../SearchProvider';
import RBSheet from 'react-native-raw-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';

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
const locationList = [
  '강원도',
  '경기도',
  '경상남도',
  '경상북도',
  '대구',
  '대전',
  '부산',
  '서울시',
  '세종시',
  '인천',
  '전라남도',
  '전라북도',
  '충청남도',
  '충청북도',
];
const locationStates = [
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
  true,
  true,
  true,
  true,
];
const list=[];
const ListSearchScreen = () => {
  const [centerName, setCenterName] = useState('');
  const [typePopup, setTypePopup] = useState(false);
  const [locationPopup, setLocationPopup] = useState(false);
  const [carePopup, setCarePopup] = useState(false);
  const [careType, setCareType] = useState([]);
  const [areaType, setAreaType] = useState([]);
  const {centerType, setCenterType} = useContext(SearchContext);
  const {location, setLocation} = useContext(SearchContext);
  const {treatment, setTreatment} = useContext(SearchContext);
  const treatmentBottomSheet = useRef();
  const locationBottomSheet=useRef();
  const [showList,setShowList]=useState([]);
  const [count, setCount]=useState(0);


  async function searchEngine() {
    try {
      await firestore()
        .collection('user')
        .doc(String(centerType))
        .collection('서울시')
        .get()
        .then((querySnapshot) => {
          console.log('서울시 갯수: ', querySnapshot.size);
          console.log('현재 입력창 :', centerName);
          console.log('list: ',list);

          if (centerName.length > 0) {
            // setShowList([...querySnapshot.docs.filter((mem)=>mem.id.includes(centerName))]);
            // setShowList([]);
            querySnapshot.docs.map((mem, idx) => {
              if (mem.id.includes(centerName)) {
                console.log('포함: ', mem.id);
                // showList.push(mem.id);
                setShowList([...showList, mem.id]);
                // list.push(mem.id);
                console.log('list: ',list);
                // return <TouchableOpacity
                //           key={idx}
                //           style={{
                //             height: 33,
                //             backgroundColor: 'white',
                //             borderWidth: 1,
                //             padding: 5,
                //             borderColor: '#FA8072',
                //             marginRight: 5,
                //             marginTop: 5}}
                //           onPress={() => {
                //             //개별기관 정보페이지로
                //           }}>
                //           <Text style={{fontSize: 16, color: '#000'}}>
                //             {mem.id}
                //           </Text>
                //        </TouchableOpacity>
              };
            });
          }
        });
    } catch (error) {
      throw error;
    }
  }
  useEffect(()=>{
    setShowList([]);
    searchEngine();
  },[centerName])
  return (
    <View style={styles.container}>
      <View style={{
        width : '100%',
        height: 60,
        // flex: 1,
        alignItems: 'center'}}>
        <FormInput
          labelValue={centerName}
          onChangeText={(userCenter) => 
            {
              list.length=0;
              setCenterName(userCenter);
              // searchEngine();
              
              // setShowList([]);
            }}
          placeholderText="병원 또는 센터를 검색하세요"
          iconType={require('../assets/loupe.png')}
          autoCapitalize="none"
          autoCorrect={false}
          editable={true}
        />
      </View>
      {centerName.length>0 &&
      <View style={{flex:1, flexDirection:'column', backgroundColor : 'yellow'}}> 
        {showList.map((mem,idx)=>{
          // setCount(idx);
          return <TouchableOpacity
                key={idx}
                style={{
                  height: 33,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  padding: 5,
                  borderColor: '#FA8072',
                  marginRight: 5,
                  marginTop: 5}}
                onPress={() => {
                  //개별기관 정보페이지로
                }}>
                <Text style={{fontSize: 16, color: '#000'}}>
                  {mem}
                </Text>
              </TouchableOpacity>
        })}
      </View>}
      <View style={{flex: 7, flexDirection: 'column', backgroundColor : 'pink'}}>
        <View>
          <TouchableOpacity
            style={[styles.button, {width: 42}]}
            onPress={() => {
              // searchEngine();
              // setTypePopup(true);
            }}>
            <Text style={{fontSize: 16, color: '#FA8072'}}>{centerType}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.button, {width: 58}]}
            onPress={() => {
              // setLocationPopup(true);
              locationBottomSheet.current.open();
            }}>
            <Text style={{fontSize: 16, color: '#FA8072'}}>{location}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.button, {width: 74}]}
            onPress={() => {
              // setCarePopup(true);
              treatmentBottomSheet.current.open();
            }}>
            <Text style={{fontSize: 16, color: '#FA8072'}}>치료영역</Text>
          </TouchableOpacity>
          {careType.map((mem, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.button,
                  {width: 16 * treatmentTypes[mem].length + 8},
                ]}
                onPress={() => {
                  setCareType([
                    ...careType.slice(0, idx),
                    ...careType.slice(idx + 1),
                  ]);
                  treatmentStates[mem] = !treatmentStates[mem];
                }}>
                <Text style={{fontSize: 16, color: '#FA8072'}}>
                  {treatmentTypes[mem]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Modal visible={typePopup} animationType="slide">
        <View>
          <Button
            title="병원"
            onPress={() => {
              setCenterType('병원'), setTypePopup(false);
            }}
          />
          <Button
            title="사설센터"
            onPress={() => {
              setCenterType('사설센터'), setTypePopup(false);
            }}
          />
        </View>
      </Modal>

      {/* 치료과목 선택 */}
      {/* <Modal visible={carePopup} animationType="slide"> */}
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
                    careType.map((mem, idx) => {
                      setTreatment([...treatment, mem]);
                    });
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
                flex: 3,
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


      {/* 지역 선택 */}
      <RBSheet
        ref={locationBottomSheet}
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
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 5,
              paddingBottom: 10,
              borderColor: '#FA8072',
              borderBottomWidth: 1,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'normal',
                textAlign: 'center',
              }}>
              지역 선택
            </Text>
          </View>
          {locationStates.map((mem, idx) => {
            return (
              idx % 2 === 0 && (
                <View style={styles.horizontalRegion} key={idx}>
                  <View style={{flex: 1, justifyContent: 'center'}} key={idx}>
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => {
                        setLocation(locationList[idx]);
                        locationStates[idx] = !locationStates[idx]; //안 눌렸을 땐 누르는 순간 false로 바뀌고 careType에 0 추가
                        // if (!locationStates[idx]) {
                        //   setAreaType([idx, ...areaType]);
                        // } else {
                        //   //이미 눌려있다면 해당하는 놈만 쏙 빼
                        //   setAreaType([
                        //     ...areaType.slice(0, areaType.indexOf(idx)),
                        //     ...areaType.slice(areaType.indexOf(idx) + 1),
                        //   ]);
                        // }
                        // console.log('areaType: ', areaType);
                        // console.log(
                        //   'treatmentStates[',
                        //   idx,
                        //   ']: ',
                        //   locationStates[idx],
                        // );
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: locationStates[idx] ? '#000' : '#FA8072'},
                        ]}>
                        {locationList[idx]}
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
                        setLocation(locationList[idx + 1]);
                        locationStates[idx + 1] = !locationStates[idx + 1]; //안 눌렸을 땐 누르는 순간 false로 바뀌고 careType에 0 추가
                        // if (!locationStates[idx + 1]) {
                        //   setAreaType([idx + 1, ...areaType]);
                        // } else {
                        //   //이미 눌려있다면 해당하는 놈만 쏙 빼
                        //   setAreaType([
                        //     ...areaType.slice(0, areaType.indexOf(idx + 1)),
                        //     ...areaType.slice(areaType.indexOf(idx + 1) + 1),
                        //   ]);
                        // }
                        // console.log('careType: ', careType);
                        // console.log(
                        //   'locationStates[',
                        //   idx + 1,
                        //   ']: ',
                        //   locationStates[idx + 1],
                        // );
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: locationStates[idx + 1] ? '#000' : '#FA8072',
                          },
                        ]}>
                        {locationList[idx + 1]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            );
          })}
        </View>
      </RBSheet>
    </View>
  );
};

export default ListSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: 5,
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
  horizontalRegion: {flex: 3, flexDirection: 'row', backgroundColor: '#EEEEE8'},
});
