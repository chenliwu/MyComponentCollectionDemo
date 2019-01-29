import {
    NetInfo,
} from 'react-native';

/**
 * 2019-01-29
 * chenlw
 * work：封装NetInfo工具类
 *
 * 问题记录：在android平台时，获取网络状态是没问题的，可是在IOS平台时出问题了，总是不能获取正确的网络状态。
 * 经过多方的查询找到了一个合适的解决方法。在获取IOS的网络状态时需要调用一次网络状态改变的监听才能准确获取到网络的链接状态
 * * RN版本0.57.7版本已经修复这个问题。
 * * 但是0.55.x版本没有解决，需要在获取IOS的网络状态时需要调用一次网络状态改变的监听才能准确获取到网络的链接状态。
 *
 * IOS模拟器反复断网和恢复网络操作，网络监听状态有时监听不到，但到了真机上运行是没有问题的。
 *
 *
 * 注意RN版本，版本不一样，有可能导致获取网络状态失败或者不准确。
 * RN版本：0.57.7
 */
export default class NetInfoUtils {


    static netIsConnected = true;


    /**
     * 获取网络状态
     * @param callback  callback(netIsConnected,netTypeMessage)
     */
    static getNetworkState = (callback) => {
        NetInfo.getConnectionInfo().then((connectionInfo) => {

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
            callback && callback(netIsConnected,netTypeMessage);
        });
    };


    /***
     * 获取网络连接状态  NetInfo.isConnected.
     *
     * @param callback
     */
    static getNetworkIsConnectedState = (callback) => {
        NetInfo.isConnected.fetch().done((isConnected) => {
                callback && callback(isConnected);
            }
        );
    };

    /**
     * 注册网络监听器
     */
    static addNetListener = (callback) => {
        NetInfo.addEventListener('connectionChange', callback);
    };

    /**
     * 移除网络监听器
     */
    static removeNetListener = () => {
        NetInfo.removeEventListener('connectionChange', callback);
    };


    /**
     * 注册NetInfo.isConnected网络监听，获取网络连接状态
     *
     * true: 连接， false: 离线
     * @param {*}  callback
     */
    static addIsConnectedNetListener = (callback) => {
        NetInfo.isConnected.addEventListener('connectionChange', callback);
    };

    /**
     * 移除NetInfo.isConnected网络监听
     *
     * @param {*} callback
     */
    static removeIsConnectedNetListener = (callback) => {
        NetInfo.isConnected.removeEventListener('connectionChange', callback);
    };


}