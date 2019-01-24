import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import {LoadingDialog} from './../utils/LoadingDialogUtils';


export default class ReactNativeSpinkitExample extends Component {

    static navigationOptions = {
        headerTitle: 'react-native-spinkit demo1',
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: 100,
            color: "#FFFFFF",
            isVisible: true,

            loadingDialogVisible: false,    //是否显示加载层
            loadingHintText: null,          //加载层提示语
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


    render() {
        let type = this.state.types[this.state.index];

        return (
            <View style={styles.container}>
                <Button title={'打开加载层'} onPress={() => {
                    this.showLoadingDialog('加载中');
                    setTimeout(() => {
                        this.closeLoadingDialog();
                    }, 3000);
                }}/>
                <LoadingDialog
                    loadingDialogVisible={this.state.loadingDialogVisible}
                    loadingHintText={this.state.loadingHintText}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    spinner: {
        marginBottom: 50
    },

    btn: {
        marginTop: 20
    },

    text: {
        color: "white"
    }
});