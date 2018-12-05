import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import Tips from 'react-native-root-tips';


export default class RootTipsExample extends React.Component {

    static navigationOptions = {
        headerTitle: 'RootTipsExample',
    };

    loadingTips = null;

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
                    this._sampleSimple();
                }}/>
                <Button title={'Loading success'} onPress={() => {
                    this._sampleDefaultSuccess();
                }}/>
                <Button title={'Loading fail'} onPress={() => {
                    this._sampleDefaultFail();
                }}/>

                <Button title={'masking'} onPress={() => {
                    this._sampleMask();
                    setTimeout(()=>{
                        Tips.hide();
                    },5000);
                }}/>
            </View>
        )
    }


    _sampleSimple() {
        Tips.show('hello world!', {
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: -50
        });
    }

    _sampleDefaultLoading() {
        Tips.show('loading...', {showLoading: true});
    }

    _sampleDefaultSuccess() {
        Tips.show('loading success', {showSuccess: true});
    }

    _sampleDefaultFail() {
        Tips.show('loading fail', {showFail: true});
    }

    _sampleCustomImage() {
        // you can use local Image and net image
        Tips.show('Custom Images', {
            backgroundColor: 'white',
            textColor: 'black',
            opacity: 0.9,
            image: {uri: 'http://www.sucaijishi.com/uploadfile/2015/0210/20150210104952902.gif'}
        });

        // local Image
        // Tips.show('Custom Images',{image: require('./src/loading.gif')});
    }

    _sampleOnlyImage() {
        Tips.show('tips will not show', {showText: false, showLoading: true});
    }

    _sampleMask() {
        //when showing, you can't touch anything
        this.loadingTips = Tips.show('masking...', {
            mask: true,
            duration:300000,
            showLoading: true,
            //maskOpacity: true,
            //maskColor: 'rgba(0,0,0,0)'
        });
    }


}