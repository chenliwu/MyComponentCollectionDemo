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

import GlobalModalStyles from './GlobalModalStyles';

export default class ModalDemo extends Component {

    static navigationOptions = {
        title: 'Modal',
    };

    state = {
        loadingModalVisible: false,
    };


    showLoadingModal = () => {
        this.setState({
            loadingModalVisible: true
        });
    };

    closeLoadingModal = () => {
        this.setState({
            loadingModalVisible: false
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>

                <Button title='显示Modal' onPress={() => {

                    this.showLoadingModal();

                    setTimeout(() => {
                        alert('closeLoadingModal');
                        this.closeLoadingModal();
                    }, 3000)

                }}/>

                <Modal
                    //style={GlobalModalStyles.LoadingModalStyle}
                    isVisible={this.state.loadingModalVisible}
                    backdropOpacity={0}     //遮盖层背景透明度
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                >
                    <View style={GlobalModalStyles.loadingModalContentContainerStyle}>
                        <View style={GlobalModalStyles.loadingModalBodyStyle}>
                            <ActivityIndicator size="large"/>
                            <Text style={GlobalModalStyles.loadingModalTitleStyle}>登录中...</Text>

                        </View>

                    </View>

                </Modal>
            </View>
        );
    }
}