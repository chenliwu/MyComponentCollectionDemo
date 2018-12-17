/**
 * 2018-11-26
 * chenlw
 * work：封装手机型号工具类
 *
 */
import {
    Dimensions,
    Platform
}from 'react-native';


const iponeXWidth = 375;
const iphoneXHeight = 812;

const isIos = Platform.OS === 'ios';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PhoneModelUtils = {

    isIphoneX: ()=>{
        return isIos && iponeXWidth === screenWidth  && iphoneXHeight === screenHeight;
    },


};

export default PhoneModelUtils;