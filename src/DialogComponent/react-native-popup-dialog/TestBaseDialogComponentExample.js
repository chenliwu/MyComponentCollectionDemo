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

import GlobalLoadingDialogStyle from './GlobalLoadingDialogStyle';

import BaseDialogComponent from './BaseDialogComponent/BaseDialogComponent';

export default class TestBaseDialogComponentExample extends BaseDialogComponent {

    static navigationOptions = {
        headerTitle: '测试基类Dialog',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Button title="打开loadingDialog" onPress={() => {
                    this.showLoadingDialog("处理中...");
                    setTimeout(() => {
                        this.closeLoadingDialog();
                    }, 3000);
                }}/>

                <Dialog
                    width={GlobalLoadingDialogStyle.dialogWidthPercent}
                    height={GlobalLoadingDialogStyle.dialogHeightPercent}
                    visible={this.state.loadingDialogVisible}
                    rounded
                    overlayBackgroundColor={GlobalLoadingDialogStyle.overlayBackgroundColor}  //设置遮盖层的背景色
                    dialogStyle={GlobalLoadingDialogStyle.dialogStyle}
                >
                    <View style={GlobalLoadingDialogStyle.dialogContentContainerStyle}>
                        <ActivityIndicator size="large"/>
                        <Text style={GlobalLoadingDialogStyle.loadingHintTextStyle}>{this.state.loadingHintText}</Text>
                    </View>
                </Dialog>

            </View>
        )
    }

}