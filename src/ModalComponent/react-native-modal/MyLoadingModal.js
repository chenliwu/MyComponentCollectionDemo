/**
 * Created by on 2017/5/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Alert,
    Text,
    ActivityIndicator,
} from 'react-native';

import Modal from "react-native-modal";

import ToastUtils from './../../utils/ToastUtils';

import GlobalModalStyles from './GlobalModalStyles';

export default class ModalDemo extends Component {

    static navigationOptions = {
        title: 'Modal',
    };

    state = {
        loadingModalVisible: false,
        loadingModalHintText: '',
    };


    showLoadingModal = (text) => {
        this.setState({
            loadingModalVisible: true,
            loadingModalHintText:text,
        });

    };

    closeLoadingModal = () => {
        this.setState({
            loadingModalVisible: false,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>
                    BUG记录：在IOS端，当Modal与Alert有冲突；当关闭Modal时要显示Alert，会导致UI被锁定，页面无法响应任何操作。
                </Text>

                <Button title='显示Modal' onPress={() => {

                    this.showLoadingModal('loading...');

                    setTimeout(() => {
                        //alert('closeLoadingModal');
                        Alert.alert('title','message');
                        ToastUtils.showBottomShortToast('closeLoadingModal');
                        this.closeLoadingModal();
                    }, 3000);

                }}/>

                <Modal
                    isVisible={this.state.loadingModalVisible}
                    backdropOpacity={GlobalModalStyles.backdropOpacity}
                    animationIn={GlobalModalStyles.animationIn}
                    animationOut={GlobalModalStyles.animationOut}
                >
                    <View style={GlobalModalStyles.loadingModalContentContainerStyle}>
                        <View style={GlobalModalStyles.loadingModalBodyStyle}>
                            <ActivityIndicator size="large"/>
                            <Text style={GlobalModalStyles.loadingModalTitleStyle}>{this.state.loadingModalHintText}</Text>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
}