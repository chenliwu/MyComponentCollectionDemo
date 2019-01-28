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
 * 2019-01-28
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
            netIsConnected: true,       //网络是否已经连接
            netTypeMessage: '',         //网络状态说明
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
     * @param connectionInfo
     * @private
     */
    _handleFirstConnectivityChange = (connectionInfo) => {
        console.log('_handleFirstConnectivityChange');
        console.log(connectionInfo);
        console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);

        let netIsConnected = true;
        let netTypeMessage = '';
        if (connectionInfo.type === 'unknown') {
            netTypeMessage = '设备处于离线状态';
            netIsConnected = false;
        } else if (connectionInfo.type === 'none') {
            netTypeMessage = '设备联网状态异常';
            netIsConnected = false;
        } else if (connectionInfo.type === 'wifi') {
            netTypeMessage = '设备通过wifi联网';
            netIsConnected = true;
        } else if (connectionInfo.type === 'cellular') {
            netTypeMessage = '设备通过蜂窝数据流量联网';
            netIsConnected = true;
        }

        this.setState({
            connectionInfo: 'First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
            netIsConnected: netIsConnected,
            netTypeMessage: netTypeMessage
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>联网状态：{this.state.connectionInfo}</Text>
                <Text>状态说明：{this.state.netTypeMessage}</Text>
                <Button title={'是否联网'} onPress={() => {

                    /**
                     * 问题记录
                     * 当设备断开网络后，connectionChange监听事件就失效了，需要NetInfo.isConnected.fetch()操作或者重新进入页面才能恢复监听。
                     *
                     * 因此，如果用户点击某个按钮需要判断网络状态，要使用下面这种方式，点击按钮先获取网络状态，若是没有网络则给予用户提示信息。
                     * （实时获取网络的状态）
                     *
                     */
                    NetInfo.isConnected.fetch().done((isConnected) => {
                        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                        console.log(isConnected);
                        alert('First, is ' + (isConnected ? 'online' : 'offline'));
                    });
                }}/>

                <Button title={'是否联网测试'} onPress={() => {
                    if (this.state.netIsConnected) {
                        alert('设备处于联网');
                    } else {
                        alert('设备处于离线状态');
                    }
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