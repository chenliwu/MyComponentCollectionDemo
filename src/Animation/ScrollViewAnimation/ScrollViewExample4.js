/**
 * Create by lutn on 2018-04-17
 *
 */
'use strict';


import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    LayoutAnimation
} from 'react-native';

import PhoneModelUtils from './../../utils/PhoneModelUtils';

const globalHeaderHeight = 70;

const isIphoneX = PhoneModelUtils.isIphoneX();

/**
 * 自定义动画
 * @type {{duration: number, create: {type: *, property: *}, update: {type: *}}}
 */
const CustomLayoutAnimation = {
    duration: 300,
    delay: 50,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.curveEaseInEaseOut,
        //type: LayoutAnimation.Types.linear,
    },
};

/**
 * react-native 实现header渐变
 */
export default class ScrollViewExample4 extends Component {

    static navigationOptions = ({navigation, screenProps}) => {
        const headerOpacity = navigation.getParam('headerOpacity', 1);
        const headerHeight = navigation.getParam('headerHeight', globalHeaderHeight);

        if (headerHeight <= globalHeaderHeight / 1.5) {
            return ({
                headerLeft: <View/>,
                headerTitle: <View/>,
                title: '审批详情',
                headerStyle: {
                    height: headerHeight,
                },
            });
        }

        if (isIphoneX) {
            return ({
                headerTitle: 'header渐变',
                headerStyle: {
                    opacity: headerOpacity,
                    //backgroundColor: 'red',
                    //iPhone X设置header高度为0，但header仍然会显示，因为navigation原生header里面使用了headerForceInset
                    height: headerHeight,
                },
            });
        }
        return ({
            headerTitle: 'header渐变',
            headerStyle: {
                opacity: headerOpacity,
                //backgroundColor: 'red',
                //iPhone X设置header高度为0，但header仍然会显示，因为navigation原生header里面使用了headerForceInset
                height: headerHeight,
            },
        });

    };

    constructor(props) {
        super(props);
        this._refHeader = null;

        this.props.navigation.setParams({
            headerOpacity: 1,
            headerHeight: globalHeaderHeight
        });
    }

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {
        let Y = event.nativeEvent.contentOffset.y;
        if (Y >= 0) {
            if (Y <= globalHeaderHeight) {
                //页眉变化的动画
                //LayoutAnimation.configureNext(CustomLayoutAnimation);
                LayoutAnimation.easeInEaseOut();

                //动态改变header的高度
                this.props.navigation.setParams({
                    headerHeight: globalHeaderHeight - Y,
                });
            } else {
                //LayoutAnimation.configureNext(CustomLayoutAnimation);
                LayoutAnimation.easeInEaseOut();

                this.props.navigation.setParams({
                    headerHeight: 0,
                });
            }
        }
    };

    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        let Y = event.nativeEvent.contentOffset.y;
        if (Y >= 0) {
            if (Y <= globalHeaderHeight) {
                //页眉变化的动画
                //LayoutAnimation.configureNext(CustomLayoutAnimation);
                LayoutAnimation.easeInEaseOut();

                //动态改变header的高度
                this.props.navigation.setParams({
                    headerHeight: globalHeaderHeight,
                });
            } else {
                //LayoutAnimation.configureNext(CustomLayoutAnimation);
                LayoutAnimation.easeInEaseOut();

                this.props.navigation.setParams({
                    headerHeight: 0,
                });
            }
        }
    };


    render() {
        return (
            <View>
                <ScrollView
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEndDrag}
                    scrollEventThrottle={5}
                >
                    <Text style={{height: 30, backgroundColor: 'pink'}}>--------1111111---------</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 30, backgroundColor: 'pink'}}>11111111</Text>

                </ScrollView>
            </View>
        )
    }

    renderItem() {
        // 数组
        const itemAry = [];
        // 颜色数组
        const colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
        // 遍历
        for (let i = 0; i < colorAry.length; i++) {
            itemAry.push(
                <View key={i} style={[styles.itemStyle, {backgroundColor: colorAry[i]}]}></View>
            );
        }
        return itemAry;
    }

}


const styles = StyleSheet.create({
    scrollViewStyle: {
        // 背景色
        backgroundColor: 'red'
    },

    itemStyle: {
        // 尺寸
        width: '100%',
        height: 200
    },
});


