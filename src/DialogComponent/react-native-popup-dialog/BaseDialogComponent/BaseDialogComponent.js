import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

import GlobalLoadingDialogStyle from './../GlobalLoadingDialogStyle';

/**
 * 2018-12-5
 * chenlw
 * work：封装基类的Dialog类，以提高代码重用，降低代码冗余。
 *
 * 使用方法：
 * （1）需要显示Dialog的页面继承BaseDialogComponent类。
 * （2）页面引入Dialog组件，并在state设置loadingDialogVisible和loadingHintText属性。如下面render方法注释中的Dialog。
 * （3）显示或关闭Dialog，就调用基类对应的方法。
 *
 */
export default class BaseDialogComponent extends React.Component {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loadingDialogVisible: false,
    //         loadingHintText: null
    //     }
    // }


    componentWillUpdate(){
        console.log("BaseDialogComponent---componentWillUpdate");
    }

    componentDidUpdate(){
        console.log("BaseDialogComponent---componentDidUpdate");
    }


    /**
     * 打开加载对话框
     * @param loadingHintText 提示文本
     */
    showLoadingDialog = (loadingHintText) => {
        this.setState({
            loadingDialogVisible: true,
            loadingHintText: loadingHintText,
        });
    };

    /**
     * 关闭加载对话框
     */
    closeLoadingDialog = () => {
        this.setState({
            loadingDialogVisible: false,
            loadingHintText: null,
        });
    };

    // render(){
    //     return (
    //         <Dialog
    //             width={GlobalLoadingDialogStyle.dialogWidthPercent}
    //             height={GlobalLoadingDialogStyle.dialogHeightPercent}
    //             visible={this.state.loadingDialogVisible}
    //             rounded
    //             overlayBackgroundColor={GlobalLoadingDialogStyle.overlayBackgroundColor}  //设置遮盖层的背景色
    //             dialogStyle={GlobalLoadingDialogStyle.dialogStyle}
    //         >
    //             <View style={GlobalLoadingDialogStyle.dialogContentContainerStyle}>
    //                 <ActivityIndicator size="large"/>
    //                 <Text style={GlobalLoadingDialogStyle.loadingHintTextStyle}>{this.state.loadingHintText}</Text>
    //             </View>
    //         </Dialog>
    //     );
    // }

}