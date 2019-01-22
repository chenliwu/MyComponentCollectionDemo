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

 1、当设备断开网络时：{type: "none", effectiveType: "unknown"}
 2、当设备连接wifi时：{type: "wifi", effectiveType: "unknown"}
 3、当设备连接移动网络时：{type: "mobile", effectiveType: "unknown"}

 *
 *
 */
export default class NetInfoExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: '',
        };
    }

    componentDidMount() {
        //监听网络的变化
        NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
        NetInfo.fetch().done((connectionInfo) => {
            console.log('fetch.done');
            console.log(connectionInfo);
            this.setState({
                connectionInfo: connectionInfo
            });
        });
    }

    _handleConnectionInfoChange = (connectionInfo) => {
        console.log('connectionChange');
        console.log(connectionInfo);
        this.setState({
            connectionInfo: connectionInfo
        });
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<Text>网络状态：{this.state.connectionInfo}</Text>*/}
            </View>
        )
    }

    componentWillUnmount(){
        NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange);
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