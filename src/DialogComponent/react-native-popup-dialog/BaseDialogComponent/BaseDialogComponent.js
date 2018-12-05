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

export default class BaseDialogComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loadingDialogVisible: false,
            loadingHintText: null
        }
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