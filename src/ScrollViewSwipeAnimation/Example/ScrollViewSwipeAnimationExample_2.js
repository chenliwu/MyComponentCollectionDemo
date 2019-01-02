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

import {
    SafeAreaView
} from 'react-navigation';

import PhoneModelUtils from './../../utils/PhoneModelUtils';

const globalHeaderHeight = 70;

const isIphoneX = PhoneModelUtils.isIphoneX();
const absoluteViewHeight = 100;

/**
 * react-native 实现插值动画控制底部绝对定位组件
 */
export default class ScrollViewSwipeAnimationExample extends Component {

    static navigationOptions = ({navigation, screenProps}) => {

        return ({
            title: 'ScrollView滑动动画',
        });

    };

    constructor(props) {
        super(props);
        this.state = {
            headerHeight: new Animated.Value(0),

            scrollViewContentOffsetYAnimation: new Animated.Value(0),//初始化动画值
            scrollViewContentOffsetY: 0,
            absoluteViewBottom: 0,
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            headerHeight: globalHeaderHeight
        });
    }

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {

        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < 0) {
            this.setState({
                scrollViewContentOffsetY: offsetY,
            });
        } else {
            this.setState({
                scrollViewContentOffsetY: offsetY,
                absoluteViewBottom: -offsetY,
            });
        }

    };

    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        this.setState({
            scrollViewContentOffsetY: offsetY,
        });

        if (offsetY > 0 && offsetY < absoluteViewHeight) {
            //滑动距离超过绝对定位组件高度的一般就隐藏，否则就显示
            if (Math.abs(this.state.absoluteViewBottom) < absoluteViewHeight / 2) {
                this.setState({
                    absoluteViewBottom: 0,
                });
            } else {
                this.setState({
                    absoluteViewBottom: -absoluteViewHeight,
                });
            }

        }


    };


    render() {

        const absoluteViewBottom = this.state.absoluteViewBottom;

        return (
            <SafeAreaView style={{
                flex: 1,
            }}>

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
                    onScroll={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        //把contentOffset.x绑定给this.state.scrollViewContentOffsetYAnimation
                                        y: this.state.scrollViewContentOffsetYAnimation,
                                    }
                                }
                            }],
                            {listener: this._onScroll}
                        )
                    }
                    onScrollEndDrag={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        //把contentOffset.x绑定给this.state.xOffset
                                        //y: this.state.headerOpacity,
                                        y: this.state.scrollViewContentOffsetYAnimation,
                                    }
                                }
                            }],
                            {listener: this._onScrollEndDrag}
                        )
                    }
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


                <View
                    onPress={() => {
                        alert('111');
                    }}
                    style={{
                        position: 'absolute',
                        height: absoluteViewHeight,
                        backgroundColor: 'red',
                        bottom: absoluteViewBottom,
                        //bottom: -absoluteViewHeight,
                        left: 0,
                        right: 0,
                    }}>

                </View>

            </SafeAreaView>
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


