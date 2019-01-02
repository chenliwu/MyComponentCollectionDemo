'use strict';


import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    LayoutAnimation,
    Animated,
    Easing,
    PanResponder
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
            absoluteViewVisible: true,
        }
    }

    componentWillMount() {

        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            //用户开始触摸屏幕的时候，是否愿意成为响应者；
            onStartShouldSetPanResponder(event, gestureState) {
                return true;
            },
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (event, gesturesState) => {
                //每次滑动前回调此方法
                // View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。

                // const vy = gesturesState.vy;             //当前的纵向移动速度
                // if (vy > 0) {
                //     //往上滑动，显示底部绝对定位组件
                //     this.showAbsoluteView();
                // } else {
                //     //往下滑动，隐藏底部绝对定位组件
                //     this.hideAbsoluteView();
                // }

            },


            onPanResponderMove: (event, gesturesState) => {
                //用户正在屏幕上移动手指时（没有停下也没有离开屏幕）。
                //// onPanResponderMove:最近一次的移动距离为gestureState.move{X,Y}


                const vy = gesturesState.vy;             //当前的纵向移动速度
                if (vy >= 1.5) {
                    //纵向移动速度大于1时，表示滑动速度很快
                    this.showAbsoluteView();
                } else {
                    if (this.state.scrollViewContentOffsetY > absoluteViewHeight) {

                    }
                }


                // const vy = gesturesState.vy;             //当前的纵向移动速度
                // if (vy > 0) {
                //     //往上滑动，显示底部绝对定位组件
                //     this.showAbsoluteView();
                // } else {
                //     //往下滑动，隐藏底部绝对定位组件
                //     this.hideAbsoluteView();
                // }
            },
            onPanResponderRelease: (event, gesturesState) => {
                //触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。

                //console.log('onPanResponderRelease');

            }
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
                absoluteViewBottom: -offsetY,   //逐渐改变绝对定位组件的位置
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
                this.showAbsoluteView();
            } else {
                this.hideAbsoluteView();
            }
        } else if (offsetY > absoluteViewHeight) {
            //ScrollView滚动距离超过底部绝对定位组件则隐藏该组件
            this.hideAbsoluteView();
        }


    };

    showAbsoluteView = () => {
        this.setState({
            absoluteViewBottom: 0,
        });
    };

    hideAbsoluteView = () => {
        this.setState({
            absoluteViewBottom: -absoluteViewHeight,
        });
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
                    {...this._panResponder.panHandlers} //添加手势监听
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


