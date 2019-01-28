import React, {
    Component
} from 'react';

import {
    NetInfo,
} from 'react-native';

/**
 * 2019-01-28
 * chenlw
 * work：封装监听网络状态变化的base component
 */
export default class BaseNetInfoComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            netIsConnected: true,       //网络是否已经连接
            netTypeMessage: '',         //网络状态说明
        };
    }

    componentDidMount() {
        console.log('BaseNetInfoComponent --- componentDidMount');
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
            netIsConnected: netIsConnected,
            netTypeMessage: netTypeMessage
        });
    };

    componentWillUnmount() {
        console.log('BaseNetInfoComponent --- componentWillUnmount');
        //移除网络监听
        NetInfo.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
    }

}
