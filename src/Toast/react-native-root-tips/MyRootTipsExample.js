import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';


import RootTipsUtils from './RootTipsUtils';

import BaseHintComponent from './base/BaseHintComponent';

/**
 * 2018-12-5
 * chenlw
 * work：封装Toast代码
 */
export default class MyRootTipsExample extends BaseHintComponent {

    static navigationOptions = {
        headerTitle: '封装Toast代码',
    };

    constructor(props) {
        super(props);
        this.state = {
            loadingDialogVisible: false,
            loadingHintText: null
        };
    }


    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button title={'简单Toast'} onPress={() => {
                    //RootTipsUtils.showSimpleToast('简单toast');
                    this.showSimpleToast('简单toast');
                }}/>
                <Button title={'Loading success'} onPress={() => {
                    //RootTipsUtils.showDefaultSuccessToast('Loading success');
                    this.showDefaultSuccessToast('Loading success');
                }}/>
                <Button title={'Loading fail'} onPress={() => {
                    //RootTipsUtils.showDefaultFailToast('Loading fail');
                    this.showDefaultFailToast('Loading fail');
                }}/>

                <Button title={'loading'} onPress={() => {
                    //RootTipsUtils.showLoading('loading...');
                    this.showLoading('loading...');
                    setTimeout(()=>{
                        //RootTipsUtils.hideTips();
                        this.hideTips();
                    },5000);
                }}/>
            </View>
        )
    }


}