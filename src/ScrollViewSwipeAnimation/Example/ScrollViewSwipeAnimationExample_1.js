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
    LayoutAnimation,
    Animated,
    Easing
} from 'react-native';

import PhoneModelUtils from './../../utils/PhoneModelUtils';

const globalHeaderHeight = 70;

const isIphoneX = PhoneModelUtils.isIphoneX();


/**
 * react-native 实现header渐变
 */
export default class ScrollViewSwipeAnimationExample_1 extends Component {

    static navigationOptions = ({navigation, screenProps}) => {

        const scrollViewContentOffsetYAnimation = navigation.getParam('scrollViewContentOffsetYAnimation', 0);
        const scrollViewContentOffsetY = navigation.getParam('scrollViewContentOffsetY', 0);

        //interpolate映射动画值，触发动画
        //inputRange：输入值的区间，即响应动画的输入区间
        //outputRange：输出值的区间，即动画变化的区间
        const headerOpacity = scrollViewContentOffsetYAnimation === 0 ? 1 : scrollViewContentOffsetYAnimation.interpolate({
            inputRange: [0, globalHeaderHeight],
            outputRange: [1.0, 0.0]
        });

        //console.log('scrollViewContentOffsetY=' + scrollViewContentOffsetY);

        if (scrollViewContentOffsetY > globalHeaderHeight) {
            return ({
                title: 'ScrollView滑动动画1',
                headerStyle: {
                    height: 0,
                    opacity: headerOpacity,
                },
            });
        }

        return ({
            title: 'ScrollView滑动动画',
            headerStyle: {
                height: globalHeaderHeight,
                opacity: headerOpacity,
            },
        });

    };

    static scrollViewContentOffsetY = 1;    //记录ScrollView滚动的位置

    constructor(props) {
        super(props);
        this.state = {
            scrollViewContentOffsetYAnimation: new Animated.Value(0),//初始化动画值
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            scrollViewContentOffsetYAnimation: new Animated.Value(0.0),   //初始化动画值
        });
    }

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {

        const offsetY = event.nativeEvent.contentOffset.y;

        //ScrollViewSwipeAnimationExample_1.scrollViewContentOffsetY = offsetY;

        this.props.navigation.setParams({
            //给动画赋新值
            scrollViewContentOffsetYAnimation: this.state.scrollViewContentOffsetYAnimation,
            scrollViewContentOffsetY: offsetY,
        });
    };

    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        ScrollViewSwipeAnimationExample_1.scrollViewContentOffsetY = offsetY;

        this.props.navigation.setParams({
            //给动画赋新值
            scrollViewContentOffsetYAnimation: this.state.scrollViewContentOffsetYAnimation,
        });
    };


    render() {

        return (
            <View>

                <Animated.View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        height: this.state.scrollViewContentOffsetYAnimation.interpolate({
                            inputRange: [0, globalHeaderHeight],
                            outputRange: [globalHeaderHeight, 0],
                            easing: Easing.linear,      //配置渐变函数
                            extrapolate: 'clamp',        //不允许超出区间
                            extrapolateRight: 'clamp'
                        }),
                    }}
                >
                    {/*<Text>滑动改变组件高度</Text>*/}
                </Animated.View>


                <ScrollView
                    //onScroll={this._onScroll}
                    onScroll={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        //把contentOffset.x绑定给this.state.scrollViewContentOffsetY
                                        y: this.state.scrollViewContentOffsetYAnimation,
                                    }
                                }
                            }],
                            {listener: this._onScroll}
                        )
                    }
                    // onScrollEndDrag={
                    //     Animated.event(
                    //         [{
                    //             nativeEvent: {
                    //                 contentOffset: {
                    //                     //把contentOffset.x绑定给this.state.xOffset
                    //                     //y: this.state.headerOpacity,
                    //                     y: this.state.headerHeight,
                    //                 }
                    //             }
                    //         }],
                    //         {listener: this._onScrollEndDrag}
                    //     )
                    // }
                    decelerationRate={'fast'}       //滚动视图减速停下的速度。你也可以设置为"normal"或者"fast"
                    scrollEventThrottle={16}
                >
                    <Text style={{height: 60, backgroundColor: 'pink'}}>--------1111111---------</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 50, backgroundColor: 'pink'}}>11111111</Text>

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


