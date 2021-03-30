import React from 'react';
import {View, TextInput, StyleSheet, Dimensions, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View pointerEvents='none'>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#B2B2B2"
        {...rest}
      />      
      </View>
      <View style={styles.iconStyle}>
        <Image style={{width: 25, height: 25}} source={iconType}/>
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {

    paddingRight:20,
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems : 'center',
    backgroundColor: 'green',
    shadowColor : '#000000',
    shadowOpacity : 0.3,
    shadowOffset : {width :0, height :2},
    elevation :3,

    },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 60,
    borderRightWidth: 0,
    width: 50,
  },
  input: {
    marginLeft : 20,
    height : 17,
    fontSize: 16,
    fontFamily: 'HangultuelGothic-Regular',
    color: '#B2B2B2',
    justifyContent: 'center',
    backgroundColor :'grey'
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  },
});