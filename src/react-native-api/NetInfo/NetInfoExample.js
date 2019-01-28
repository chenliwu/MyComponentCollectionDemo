import React, {
    Component
} from 'react';

import {
    View,
    Button,
    Text,
    NetInfo,
    StyleSheet
} from 'react-native';

/**
 * 2019-01-22
 * chenlw
 * work：NetInfo API练习
 * NetInfo API可以获取设备联网或者离线的状态信息。
 *

 connectionInfo.type有如下跨平台可用的值:

 none - 设备处于离线状态
 wifi - 设备通过wifi联网，或者设备是iOS模拟器
 cellular - 设备通过蜂窝数据流量联网
 unknown - 联网状态异常

 *
 *
 */
export default class NetInfoExample extends Component {

    static navigationOptions = {
        headerTitle: 'NetInfo'
    };

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: '',
        };
    }

    componentDidMount() {
        //监听网络的变化
        NetInfo.addEventListener(
            'connectionChange',
            this._handleFirstConnectivityChange
        );
    }

    /**
     * 监听网络状态的变化
     *
     * 1、IOS
     * （1）
     *
     * @param connectionInfo
     * @private
     */
    _handleFirstConnectivityChange = (connectionInfo) => {
        console.log('_handleFirstConnectivityChange');
        console.log(connectionInfo);
        console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        this.setState({
            connectionInfo: 'First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>联网状态：{this.state.connectionInfo}</Text>
                <Button title={'是否联网'} onPress={() => {
                    NetInfo.isConnected.fetch().done((isConnected) => {
                        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                        console.log(isConnected);
                        alert('First, is ' + (isConnected ? 'online' : 'offline'));
                    });
                }}/>
            </View>
        )
    }

    componentWillUnmount() {
        //移除网络监听
        NetInfo.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});