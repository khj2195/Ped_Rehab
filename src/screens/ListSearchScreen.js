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
import {useEffect} from 'react';
const seoulCenterList = [
  '(주)in공감 심리발달센터',
  '(주)관악아동발달센터',
  '(주)내아이발달연구소',
  '(주)아이리스케어 도봉아동심리발달센터',
  '(주)웰케어코리아 서울센터',
  '(주)하이파이브교육',
  '(주)하이파이브교육 문정지점',
  '(주)하이파이브교육 방이지점',
  '123언어심리연구소',
  'SRC언어심리상담센터',
  'sim발달지원센터',
  '㈜오른아동청소년발달센터',
  '가락종합사회복지관',
  '가온길감각통합발달센터',
  '강동아동발달센터',
  '강동아동발달연구소',
  '강동종합사회복지관',
  '강북언어발달재활센터',
  '강서뇌성마비복지관',
  '강서희망재활치료센터',
  '같은마음 심리발달센터',
  '공감아동발달센터',
  '관악햇살아동발달센터',
  '광운대학교',
  '광장종합사회복지관',
  '광진아동심리발달지원센터',
  '교남발달지원센터',
  '구로아동발달심리상담센터',
  '구로아동청소년심리상담센터',
  '구로언어학습발달연구소',
  '구립동대문장애인종합복지관',
  '구립용산장애인복지관',
  '국제심리인지클리닉',
  '국제아동발달클리닉 강서점',
  '국제아동발달클리닉신도림연구소',
  '굿앤굿언어감각발달센터',
  '굿앤굿언어감각발달연구소',
  '궁동종합사회복지관',
  '권혜진아동청소년상담센터',
  '그린트리예술치료센터',
  '금천누리종합사회복지관',
  '금천언어심리발달센터',
  '금천장애인종합복지관',
  '까리따스 아동발달센터',
  '까리따스방배종합사회복지관',
  '꿈꾸는 언어.상담센터',
  '꿈나래아동발달센터',
  '꿈빛마을발달센터',
  '나사렛 언어심리연구소',
  '노엘언어심리임상센터',
  '노원1종합사회복지관',
  '녹번종합사회복지관',
  '늘찬 아동청소년발달센터',
  '늘해랑인지심리연구소',
  '다니엘치료센터',
  '다사랑아동발달센터',
  '다운복지관',
  '다지기아동발달센터',
  '대치통합발달심리센터 부설 강남수중재활센터',
  '더 아이다움',
  '더사랑 아동발달센터',
  '도담아동청소년상담센터',
  '도담언어학습연구소',
  '동그라미움직임발달센터',
  '동대문종합사회복지관 부설 가족상담코칭센터',
  '동문장애인복지관',
  '동작다솜아동발달센터',
  '동작아동발달센터',
  '동작종합사회복지관',
  '두리언어발달재활센터',
  '등촌1종합사회복지관',
  '등촌4종합사회복지관',
  '등촌7종합사회복지관',
  '등촌9종합사회복지관',
  '뛰어놀자사회서비스센터',
  '라온아동발달센터',
  '라임아동청소년상담센터',
  '라파노도프로빈스음악치료클리닉',
  '라파엘발달지원센터',
  '로뎀나무아동청소년발달센터',
  '마곡심리상담센터',
  '마미정감각통합상담연구소',
  '마음뜰클리닉(clinic)아동청소년발달센터',
  '마음샘아동청소년발달심리센터',
  '마인드포유심리발달연구소',
  '마포아동발달센터',
  '마포장애인종합복지관',
  '마포푸르메스포츠센터',
  '맑은샘심리상담연구소(주)',
  '명지아동발달센터',
  '명지아동발달센터(응암점)',
  '모해아동발달센터',
  '목동행복한심리상담센터',
  '무지개발달지원센터',
  '밀알언어심리발달상담소',
  '바른걸음심리놀이운동센터',
  '바름언어발달연구원',
  '바름언어심리발달센터',
  '박경미아동발달센터',
  '반올림심리교육센터',
  '밝은숲언어심리발달센터',
  '번동2단지종합사회복지관',
  '베다니아동상담소',
  '베데스다 발달치료센터',
  '별하언어심리상담센터',
  '본동종합사회복지관',
  '봄언어심리발달센터',
  '브니엘 아동청소년발달지원센터',
  '브레인앤짐',
  '브릿지스쿨',
  '빛나다 아동발달센터',
  '사)한국예술심리상담협회',
  '사과나무심리상담연구소',
  '사단법인 굼',
  '사랑샘아동청소년발달센터',
  '사회복지법인 한국봉사회 북부종합사회복지관',
  '삼양동종합복지센터',
  '삼전종합사회복지관',
  '새봄아동청소년심리발달센터',
  '새샘언어심리연구소',
  '샘물아동발달연구소',
  '서대문아동발달센터',
  '서대문장애인종합복지관',
  '서대문종합사회복지관',
  '서로세우는학교',
  '서부장애인종합복지관',
  '서울YWCA봉천종합사회복지관',
  '서울곰두리체육센터',
  '서울베네딕도 상담센터',
  '서울시립남부장애인종합복지관',
  '서울시립뇌성마비복지관',
  '서울시립대학교종합사회복지관',
  '서울시립발달장애인복지관',
  '서울시립북부장애인종합복지관',
  '서울언어치료임상연구소',
  '서울주니어상담센터',
  '서초여성가족플라자',
  '선한이웃 재활운동발달센터',
  '성내종합사회복지관',
  '성동상담·코칭지원센터',
  '성동종합사회복지관',
  '성민복지관',
  '성민종합사회복지관',
  '성북시각장애인복지관',
  '성북아동심리발달센터',
  '성북장애인복지관',
  '성산종합사회복지관',
  '성수종합사회복지관',
  '성원언어상담연구소',
  '성프란치스꼬장애인종합복지관',
  '세곡언어심리발달센터',
  '세음심리발달연구소',
  '수색아동청소년상담센터',
  '수피아 아동청소년발달센터',
  '순천향학습자폐언어발달연구소',
  '쉼심리상담연구소',
  '시립서대문농아인복지관',
  '시립영등포장애인복지관',
  '시립은평청소년센터',
  '시소감각통합상담연구소',
  '신경혜발달상담센터(주)',
  '신당종합사회복지관',
  '신도림아동발달센터',
  '신림종합사회복지관',
  '신사종합사회복지관',
  '신창민심리운동센터',
  '심리미술연구소 분트',
  '쏘르띠언어치료교육실',
  '아름드리 아동청소년 발달센터',
  '아리심리상담센터',
  '아이라라아동발달센터',
  '아이맘인지행동발달센터',
  '아이사랑아동청소년발달센터',
  '아이생각 아동발달센터',
  '아이와나 아동발달센터',
  '아이준발달연구소',
  '아이캔운동학습센터',
  '아이플레이',
  '애린(愛隣) 발달심리상담센터',
  '양천어린이발달센터',
  '양천언어심리센터',
  '양천해누리복지관',
  '어울림운동발달센터',
  '언어인지연구소 민들레',
  '에덴장애인종합복지관',
  '에블봄',
  '에이블아동발달센타',
  '에이치플러스 브레인 발달센터',
  '에파타 언어심리센터',
  '엘림심리발달센터',
  '연세마음숲상담센터',
  '연세수언어심리연구원',
  '연세언어청각말연구원',
  '연세언어치료연구원',
  '연세유일소아청소년센터',
  '열린언어심리상담센터',
  '예봄아동청소년발달심리연구',
  '옥수종합사회복지관',
  '와우소통PLUS 듣기뇌발달센터',
  '용산아동발달센터',
  '우리들언어심리발달센터',
  '우리들언어체육발달센터',
  '우리아이발달지원센터',
  '우리아이학습심리센터',
  '우리언어치료실',
  '월계종합사회복지관',
  '월곡종합사회복지관',
  '웰트리상담센터',
  '위드 아동 발달 센터',
  '위캔발달지원센터',
  '유락종합사회복지관',
  '은지아동발달센터',
  '은평구립 우리장애인복지관',
  '은평햇살아동발달센터',
  '이소움인지운동발달센터',
  '이솜발달심리센터',
  '이은마음아동청소년상담센터',
  '이재연언어치료전문센터',
  '이재화맑은샘언어인지연구소',
  '이지EG심리감각운동발달센터',
  '이화새빛발달센터',
  '이화여대종합사회복지관',
  '이화여자대학교아동발달센터',
  '이화와우언어청각센터',
  '이화특수교육센터',
  '자광아동가정상담원',
  '자라는&꿈꾸는나무 심리센터',
  '잠실종합사회복지관',
  '장안종합사회복지관',
  '정상발달센터',
  '젬씨음악치료실',
  '주식회사 히어링메딕스',
  '주앤심리발달상담센터',
  '중곡종합사회복지관',
  '중림종합사회복지관',
  '중앙사회복지관',
  '진아동발달센터',
  '짐스아동발달센터',
  '참잘크는아이들',
  '창동종합사회복지관',
  '청담종합사회복지관',
  '청솔언어심리센터',
  '청아심리언어치료센터',
  '청원언어인지학습연구소',
  '청음복지관',
  '코끼리 아동청소년발달센터 강서',
  '코끼리아동청소년발달센터',
  '쿰아동발달센터',
  '킨더윌언어심리전문센터',
  '킹스키즈센터',
  '틔움아동청소년발달센터',
  '파랑새아동발달센터',
  '파랑새아동청소년연구소',
  '평화종합사회복지관',
  '푸른미래언어치료센터',
  '풍납종합사회복지관',
  '프리윌아동청소년발달센터',
  '피카부 언어심리상담센터',
  '필브레인',
  '하늘꿈아동발달센터',
  '하상장애인종합복지관',
  '하원아동발달연구소',
  '하이빅심리상담센터',
  '하일렌발달심리센터',
  '한걸음아동발달센터',
  '한경언어치료실',
  '한국아동발달마곡센터 주식회사',
  '한국언어청각센터',
  '한국언어치료연구소',
  '한빛음악심리상담센터',
  '한소리보청기청각언어센터',
  '한신플러스케어서울남부',
  '한아인뮤직앤마인드',
  '한우리정보문화센터',
  '함께가자 아동발달센터',
  '함께가자아동발달센터',
  '합정아동발달상담센터',
  '해나다언어심리발달센터',
  '해맑은봄심리발달센터',
  '해봄아동청소년발달센터',
  '해빛아동청소년발달센터',
  '해솔언어심리학습센터',
  '해피죤아동발달지원센터',
  '행복한언어치료실',
  '헤아림 아동발달센터',
  '헤아림아동발달센터',
  '혜윰인지심리연구소',
  '혜인아동청소년발달센터',
  '호호알멘토',
  '홀트강동복지관',
  '화원종합사회복지관',
  '황혜경보청기 청각언어센터',
  '효창종합사회복지관 아동발달지원센터',
  '휴샘가족상담센터',
  '휴샘아동가족발달센터',
  '힐마인드 언어상담센터',
  '(주)에이치에스에스에이 서울한영대점',
  '강북언어치료센터',
  '강서아동발달센터',
  '내아이발달센터',
  '늘푸른언어치료실',
  '다솜운동발달센터',
  '더블유감각통합발달센터',
  '라파아동발달센터',
  '마음세상심리치료연구소',
  '무지개아동발달센터',
  '번동3단지종합사회복지관',
  '봄빛발달센터',
  '사랑나눔상담센터',
  '사랑의복지관',
  '삼성아동발달센터',
  '성모자애복지관',
  '아이짐플',
  '위아동발달센터',
  '클나무언어교육원',
  '해밀아동발달센터',
  '해와나무 아동발달센터',
  '행복한아이들',
  '두잉운동발달연구소',
  '홍은종합사회복지관',
  '(주)더 자람',
  '강남종합사회복지관',
  '공감과발달아동청소년상담센터',
  '구로종합사회복지관',
  '그린맘심리언어연구소',
  '나무심리발달센터',
  '다미솔 언어연구원',
  '덕성언어심리연구소',
  '라임아동발달센터',
  '마천종합사회복지관',
  '목동아동발달센터',
  '블리스 아동청소년 상담센터',
  '서부재활체육센터',
  '서울장애인종합복지관',
  '성북 아이세상 발달센터',
  '센소리포유 아동청소년발달센터',
  '신길종합사회복지관',
  '아이라라심리언어발달센터',
  '아임굿아동발달센터',
  '에이에스디아동발달연구소',
  '영등포종합사회복지관',
  '원광장애인종합복지관',
  '은평연세심리언어센터',
  '이레발달지원센터',
  '이화아동발달연구소',
  '정아동청소년발달센터',
  '좋은세상발달센터',
  '충현복지관',
  '토닥토닥상담센터',
  '하나아동발달센터',
  '하늘발달상담센터',
  '한국아동신경발달연구소',
];

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
const list = [];
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
  const locationBottomSheet = useRef();
  const [showList, setShowList] = useState([]);
  const [count, setCount] = useState(0);

  // const seoulRef = firestore().collection('user').doc('사설센터').collection('서울시');
  // seoulRef.where('시군구','array-contains','은평구').get();

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
          console.log('list: ', list);

          if (centerName.length > 0) {
            // setShowList([...querySnapshot.docs.filter((mem)=>mem.id.includes(centerName))]);
            // setShowList([]);
            querySnapshot.docs.map((mem, idx) => {
              if (mem.id.includes(centerName)) {
                console.log('포함: ', mem.id);
                // showList.push(mem.id);
                setShowList([...showList, mem.id]);
                // list.push(mem.id);
                console.log('list: ', list);
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
              }
            });
          }
        });
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    setShowList([]);
    searchEngine();
  }, [centerName]);
  return (
    <View style={styles.container}>
      {/* <View style={{flex: 1, alignItems: 'center'}}> */}
      <FormInput
        labelValue={centerName}
        onChangeText={(userCenter) => {
          list.length = 0;
          setCenterName(userCenter);
          // searchEngine();

          // setShowList([]);
        }}
        placeholderText="병원 또는 센터를 검색하세요"
        iconType={require('../assets/magnifier.png')}
        autoCapitalize="none"
        autoCorrect={false}
        editable={true}
      />
      {/* </View> */}
      {/* {centerName.length > 0 && (
        // <View style={{flex: 25, flexDirection: 'column'}}>
          <ScrollView style={{}}>
          {showList.map((mem, idx) => {
            // setCount(idx);
            return (
              <TouchableOpacity
                key={idx}
                style={{
                  height: 33,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  padding: 5,
                  borderColor: '#FA8072',
                  marginRight: 5,
                  marginTop: 5,
                }}
                onPress={() => {
                  //개별기관 정보페이지로
                }}>
                <Text style={{fontSize: 16, color: '#000'}}>{mem}</Text>
              </TouchableOpacity>
            );
          })}
          {seoulCenterList.filter(mem=>mem.includes(centerName)).map((mem, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={{
                  height: 33,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  padding: 5,
                  borderColor: '#FA8072',
                  marginRight: 5,
                  marginTop: 5,
                }}
                onPress={() => {
                  //개별기관 정보페이지로
                }}>
                <Text style={{fontSize: 16, color: '#000'}}>{mem}</Text>
              </TouchableOpacity>
            );
          })}
          </ScrollView>
        // </View>
      )} */}
      {/* <View style={{flex: 7, flexDirection: 'column'}}> */}
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
      {centerName.length > 0 && (
        // <View style={{flex: 25, flexDirection: 'column'}}>
        <ScrollView style={{borderWidth:1, borderColor:'#FA8072'}}>
          {seoulCenterList
            .filter((mem) => mem.includes(centerName))
            .map((mem, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={{
                    height: 33,
                    backgroundColor: 'white',
                    padding: 5,
                    marginRight: 5,
                    marginTop: 5,
                  }}
                  onPress={() => {
                    //개별기관 정보페이지로
                  }}>
                  <Text style={{fontSize: 16, color: '#000'}}>{mem}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        // </View>
      )}
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
