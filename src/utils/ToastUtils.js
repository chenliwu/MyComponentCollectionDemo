import Toast from 'react-native-root-toast'; // 引入类库

import {
    ToastAndroid,
    Platform
} from 'react-native';


const isAndroid = Platform.OS === 'android';

/**
 * 2018-11-13
 * chenlw
 * work：封装全局Toast工具类
 */
class ToastUtils {
    /**
       * 显示顶部Toast
       */
    showTopShortToast = (content) => {
        Toast.show(content, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.TOP, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            //hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
        });
    };

    /**
    * 显示中间Toast
    */
    showCenterShortToast = (content) => {
        Toast.show(content, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            //hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
        });
    };

    /**
     * 显示底部Toast
     */
    showBottomShortToast = (content) => {
        if(!isAndroid){
            // 通过调用 Toast.show(message, options); 可以在屏幕上显示一个toast，并返回一个toast实例
            const toast = Toast.show(content, {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.BOTTOM, // toast位置
                shadow: true, // toast是否出现阴影
                animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
                //hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
                delay: 0, // toast显示的延时
                onShow: () => {
                    // toast出现回调（动画开始时）
                },
                onShown: () => {
                    // toast出现回调（动画结束时）
                },
                onHide: () => {
                    // toast隐藏回调（动画开始时）
                },
                onHidden: () => {
                    // toast隐藏回调（动画结束时）
                }
            });
        }else{
            ToastAndroid.show(content, ToastAndroid.SHORT);
        }
    };

    /**
     * 显示主色调Toast
     */
    showPrimaryColorToast = (content) => {
        Toast.show(content, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            backgroundColor: '#6a91f8',
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            //hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
        });
    };

    /**
     * 显示错误Toast
     */
    showErrorToast = (content) => {
        Toast.show(content, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            backgroundColor: 'red',
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            //hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
        });
    };

}

export default new ToastUtils();