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
 * 2019-01-29
 * chenlw
 * work：封装NetInfo工具类
 *
 * 问题记录：在android平台时，获取网络状态是没问题的，可是在IOS平台时出问题了，总是不能获取正确的网络状态。
 * 经过多方的查询找到了一个合适的解决方法。在获取IOS的网络状态时需要调用一次网络状态改变的监听才能准确获取到网络的链接状态
 * * RN版本57.7版本已经修复这个问题。
 *
 * 注意RN版本，版本不一样，有可能导致获取网络状态失败或者不准确。
 * RN版本：0.57.7
 */
export default class NetInfoUtils {


    static netIsConnected = true;


    /***
     * 获取网络连接状态
     * (Android设备)
     * @param callback
     */
    static getNetworkState = (callback) => {
        NetInfo.isConnected.fetch().done((isConnected) => {
                callback && callback(isConnected);
            }
        );
    };

    /**
     * 注册全局的网络监听器
     */
    static addGlobalNetListener = (callback) => {
        NetInfo.isConnected.addEventListener('connectionChange', NetInfoUtils.handler);
    };

    /**
     * 移除全局的网络监听器
     */
    static removeGlobalNetListener = () => {
        NetInfo.isConnected.removeEventListener('connectionChange', NetInfoUtils.handler);
    };


    static handler = (isConnected) => {
        NetInfoUtils.netIsConnected = isConnected;
    };


    /**
     * 注册网络监听，获取网络连接状态
     * (iOS设备)
     * true: 连接， false: 离线
     * @param {*}  callback
     */
    static addNetListener = (callback) => {
        NetInfo.isConnected.addEventListener('connectionChange', callback);
    };

    /**
     * 移除网络监听
     * (iOS设备)
     * @param {*} callback
     */
    static removeNetListener = (callback) => {
        NetInfo.isConnected.removeEventListener('connectionChange', callback);
    };


}