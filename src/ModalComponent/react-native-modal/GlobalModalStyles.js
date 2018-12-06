import {Dimensions} from "react-native";

import {StyleSheet} from 'react-native';

/**
 * 2018-11-28
 * chenlw
 * work：封装全局Modal样式
 *
 */


const GlobalModalStyle = StyleSheet.create({
    loadingModalContentContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0,0,0,0)',
    },
    loadingModalBodyStyle: {
        height: Dimensions.get('window').height / 6,
        width: Dimensions.get('window').width / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    //loading模态框 提示文本样式
    loadingModalTitleStyle: {
        fontSize: 18,
        color: '#fff',
        paddingTop: 15
    }
});

export default GlobalModalStyle;
