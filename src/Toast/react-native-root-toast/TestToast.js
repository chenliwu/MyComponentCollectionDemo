import React from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator
} from 'react-native';

import BaseToastComponent from './BaseToastComponent';

import ToastUtils from './ToastUtils';



export default class TestToast extends BaseToastComponent {

    static navigationOptions = {
        headerTitle: "react-native-root-toast"
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="顶部Toast" onPress={() => {
                    //this.showTopShortToast("顶部Toast");
                    ToastUtils.showTopShortToast("顶部Toast");
                }}></Button>
                <Button title="中间Toast" onPress={() => {
                    //this.showCenterShortToast("中间Toast");
                    ToastUtils.showCenterShortToast("中间Toast");
                }}></Button>
                <Button title="底部Toast" onPress={() => {
                    //this.showBottomShortToast("底部Toast");
                    ToastUtils.showBottomShortToast("底部Toast");
                }}></Button>
                <Button title="主色调Toast" onPress={() => {
                    //this.showPrimaryColorToast("主色调Toast");
                    ToastUtils.showPrimaryColorToast("主色调Toast");
                }}></Button>
                <Button title="Error Toast" onPress={() => {
                    //this.showErrorToast("Error Toast");
                    ToastUtils.showErrorToast("Error Toast");
                }}></Button>
            </View>
        )
    }
}