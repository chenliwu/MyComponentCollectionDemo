import React from 'react';
import Tips from 'react-native-root-tips';

/**
 * 2018-12-5
 * chenlw
 * work：封装基类的提示组件类，以提高代码重用，降低代码的冗余
 *
 * 使用方法：
 * （1）需要显示Toast的页面继承BaseHintComponent这个类
 * （2）调用对应的方法即可显示Toast
 *
 */
export default class BaseHintComponent extends React.Component {

    hideTips = () => {
        Tips.hide();
    };

    showSimpleToast = (message) => {
        Tips.show(message, {
            //backgroundColor: 'rgba(0,0,0,0.8)',
            position: -50,
            shadow: false,
        });
    };


    showDefaultSuccessToast = (message) => {
        Tips.show(message, {showSuccess: true});
    };


    showDefaultFailToast = (message) => {
        Tips.show(message, {showFail: true});
    };

    showLoading = (message) => {
        Tips.show(message, {
            //backgroundColor: 'blue',
            mask: true,
            duration: 300000,
            showLoading: true,
            //maskOpacity: true,
            maskColor: 'rgba(0,0,0,0.5)',   //遮盖层颜色
        });
    };


}