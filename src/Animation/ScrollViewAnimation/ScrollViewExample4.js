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

        if (headerHeight <= globalHeaderHeight / 2) {
            return ({
                header: <View style={{
                    height: 20,
                }}></View>
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

    _onScroll = (event) => {
        let Y = event.nativeEvent.contentOffset.y;
        console.log(Y);
        console.log(this._refHeader);

        if (Y >= 0 && Y <= globalHeaderHeight) {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            //动态改变header的高度
            this.props.navigation.setParams({
                headerHeight: globalHeaderHeight - Y,
                //headerOpacity: (headerHeight - Y) * (1 / headerHeight),
            });
        } else {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            this.props.navigation.setParams({
                headerHeight: 0,
            });
        }

        // if (Y < 100) {
        //     //当组件往下滑动的时候，event.nativeEvent.contentOffset.y的值会不断增大
        //     this.headerOpacity = Y * 0.01;
        //     this.props.navigation.setParams({
        //         headerOpacity: this.headerOpacity,
        //     });
        // } else {
        //     //滑动值超过100
        //     this.headerOpacity = 1;
        //     this.props.navigation.setParams({
        //         headerOpacity: this.headerOpacity,
        //     });
        // }
        // this._refHeader.setNativeProps({
        //     opacity: this.headerOpacity
        // });
    };


    render() {
        return (
            <View>
                <ScrollView
                    onScroll={this._onScroll}
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


