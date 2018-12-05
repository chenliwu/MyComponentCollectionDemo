import React from 'react';
import Tips from 'react-native-root-tips';

class RootTipsUtils extends React.Component{

    static hideTips = () => {
        Tips.hide();
    };

    static showSimpleToast = (message) => {
        Tips.show(message, {
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: -50
        });
    };


    static showDefaultSuccessToast = (message) => {
        Tips.show(message, {showSuccess: true});
    };


    static showDefaultFailToast = (message) => {
        Tips.show(message, {showFail: true});
    };

    static showLoading = (message) => {
        Tips.show(message, {
            mask: true,
            duration:300000,
            showLoading: true,
            //maskOpacity: true,
            //maskColor: 'rgba(0,0,0,0)'
        });
    };


}
export default RootTipsUtils;