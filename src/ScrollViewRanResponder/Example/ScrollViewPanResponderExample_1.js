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
    PanResponder
} from 'react-native';

/**
 * 自定义动画
 * @type {{duration: number, create: {type: *, property: *}, update: {type: *}}}
 */
const CustomLayoutAnimation = {
    duration: 150,
    create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleY,
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        //type: LayoutAnimation.Types.linear,
    },
};


const absoluteViewHeight = 100;
const globalHeaderHeight = 70;

/**
 * ScrollView手势操作
 */
export default class ScrollViewPanResponderExample_1 extends Component {

    static navigationOptions = ({navigation, screenProps}) => {
        const headerOpacity = navigation.getParam('headerOpacity', 1);
        const headerHeight = navigation.getParam('headerHeight', globalHeaderHeight);

        if (headerHeight <= globalHeaderHeight / 1.5) {
            return ({
                headerLeft: <View/>,
                headerTitle: <View/>,
                title: 'ScrollView手势操作',
                headerStyle: {
                    height: headerHeight,
                },
            });
        }

        return ({
            headerTitle: 'ScrollView手势操作',
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
        this.state = {
            swipePositionY: 0,   //记录ScrollView滑动停止的Y轴位置
            swipeState: '未滑动',
            absoluteBottom: 0,   //用于改变底部绝对定位组件的位置
            absoluteOpacity: 1,  //底部绝对定位组件的透明度
            headerHeight: globalHeaderHeight
        }
    }

    /**
     * 一般在组件的componentWillMount生命周期方法创建手势处理器
     */
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

                //nativeEvent
                const nativeEvent = event.nativeEvent;
                const locationY = nativeEvent.locationY;    //触摸点相对于父元素的纵坐标
                const pageY = nativeEvent.pageY;            //触摸点相对于根元素的纵坐标


                ///gestureState
                const moveY = gesturesState.moveY;      //最近一次移动时的屏幕纵坐标
                const y0 = gesturesState.y0;            //当响应器产生时的屏幕纵坐标
                const dy = gesturesState.dy;            //从触摸操作开始时的累计纵向路程
                const vy = gesturesState.vy;             //当前的纵向移动速度

                if (vy > 0) {
                    this.setState({
                        swipeState: '往上滑动',
                    });
                    //往上滑动，显示底部绝对定位组件
                    //this.setAbsolutePosition(0);
                    this.setState({
                        absoluteOpacity:1,
                    });
                } else {
                    this.setState({
                        swipeState: '往下滑动',
                    });
                    //往下滑动，隐藏底部绝对定位组件
                    //this.setAbsolutePosition(-absoluteViewHeight);
                    this.setState({
                        absoluteOpacity:0,
                    });
                }
            },


            onPanResponderMove: (event, gesturesState) => {
                //用户正在屏幕上移动手指时（没有停下也没有离开屏幕）。
                //// onPanResponderMove:最近一次的移动距离为gestureState.move{X,Y}

                //nativeEvent
                const nativeEvent = event.nativeEvent;
                const locationY = nativeEvent.locationY;    //触摸点相对于父元素的纵坐标
                const pageY = nativeEvent.pageY;            //触摸点相对于根元素的纵坐标


                ///gestureState
                const moveY = gesturesState.moveY;      //最近一次移动时的屏幕纵坐标
                const y0 = gesturesState.y0;            //当响应器产生时的屏幕纵坐标
                const dy = gesturesState.dy;            //从触摸操作开始时的累计纵向路程
                const vy = gesturesState.vy;             //当前的纵向移动速度


                // this.setState({
                //     ///nativeEvent
                //     locationY: locationY,
                //     pageY: pageY,
                //
                //     ///gestureState
                //     moveY: moveY,
                //     y0: y0,
                //     dy: dy,
                //     vy: vy,
                // });

                // if (vy > 0) {
                //     this.setState({
                //         swipeState: '往上滑动',
                //     });
                //     //往上滑动，显示底部绝对定位组件
                //     //this.setAbsolutePosition(0);
                //     this.setState({
                //         absoluteOpacity:1,
                //     });
                // } else {
                //     this.setState({
                //         swipeState: '往下滑动',
                //     });
                //     //往下滑动，隐藏底部绝对定位组件
                //     //this.setAbsolutePosition(-absoluteViewHeight);
                //     this.setState({
                //         absoluteOpacity:0,
                //     });
                // }


            },
            onPanResponderRelease: () => {
                //触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。

            }
        });
    }

    /**
     * 设置布局动画
     */
    setLayoutAnimation = () => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        LayoutAnimation.configureNext(CustomLayoutAnimation);
    };

    /**
     * 设置Header组件的高度
     * @param height
     */
    setHeaderHeight = (height) => {
        this.props.navigation.setParams({
            headerHeight: height,
        });
    };

    /**
     * 设置绝对定位组件的位置
     * @param absoluteBottom
     */
    setAbsolutePosition = (absoluteBottom) => {
        this.setState({
            absoluteBottom: absoluteBottom,
        });
    };


    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {
        let swipePositionY = this.state.swipePositionY;
        let Y = event.nativeEvent.contentOffset.y;

        console.log('_onScroll:swipePositionY='+Y);

        this.setLayoutAnimation();


        ////处理Header组件
        if (Y > globalHeaderHeight) {
            //动态改变header的高度
            this.setHeaderHeight(0);
        } else {
            this.setHeaderHeight(globalHeaderHeight);
        }


        // if (Y <= absoluteViewHeight / 2) {
        //     //往上滑动，显示绝对定位的组件
        //     this.setAbsolutePosition(0);
        // }

        //通过比较swipePositionY与event.nativeEvent.contentOffset.y，判断滑动方向
        // if (Y >= swipePositionY && Y >= 0) {
        //     //往下滑动时，隐藏绝对定位的组件
        //     if (this.state.absoluteBottom == 0) {
        //         this.setState({
        //             absoluteBottom: -absoluteViewHeight,
        //         });
        //     }
        //     this.setState({
        //         swipeState: '往下滑动',
        //     });
        // } else {
        //     //往上滑动，显示绝对定位的组件
        //     if (this.state.absoluteBottom < 0) {
        //         this.setState({
        //             absoluteBottom: 0,
        //         });
        //     }
        //     this.setState({
        //         swipeState: '往上滑动',
        //     });
        // }

    };

    /**
     * 滑动开始回调事件
     *
     * 注意：当刚刚开始滑动时，event.nativeEvent.contentOffset.y仍然是上次滑动的值，没有变化
     *
     * @param event
     * @private
     */
    _onScrollBeginDrag = (event) => {

    };

    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        //console.log('_onScrollEndDrag');
        //console.log('Y=' + event.nativeEvent.contentOffset.y);
        let swipePositionY = this.state.swipePositionY;
        let Y = event.nativeEvent.contentOffset.y;
        //记录ScrollView停留的Y轴位置，用于判断滑动方向
        this.setState({
            swipePositionY: Y,
        });


        ////处理Header组件
        if (Y > globalHeaderHeight) {
            //动态改变header的高度
            this.setHeaderHeight(0);
        } else {
            this.setHeaderHeight(globalHeaderHeight);
        }


        //通过比较swipePositionY与event.nativeEvent.contentOffset.y，判断滑动方向
        // if (Y >= swipePositionY && Y >= 0) {
        //     //往下滑动时，隐藏绝对定位的组件
        //     if (this.state.absoluteBottom == 0) {
        //         this.setState({
        //             absoluteBottom: -absoluteViewHeight,
        //         });
        //     }
        //     this.setState({
        //         swipeState: '往下滑动',
        //     });
        // } else {
        //     //往上滑动，显示绝对定位的组件
        //     if (this.state.absoluteBottom < 0) {
        //         this.setState({
        //             absoluteBottom: 0,
        //         });
        //     }
        //     this.setState({
        //         swipeState: '往上滑动',
        //     });
        // }

    };


    render() {
        return (
            <View>
                <Text>手势滑动方向：{this.state.swipeState}</Text>
                <ScrollView
                    onScroll={this._onScroll}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={this._onScrollEndDrag}
                    scrollEventThrottle={32}
                    {...this._panResponder.panHandlers}
                >
                    <Text style={{height: 30, backgroundColor: 'pink'}}>--------1111111---------</Text>
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
                    onPress={()=>{
                        alert('111');
                    }}
                    style={{
                    position: 'absolute',
                    height: absoluteViewHeight,
                    backgroundColor: 'red',
                    opacity: this.state.absoluteOpacity,
                    bottom: this.state.absoluteBottom,
                    //bottom: -absoluteViewHeight,
                    left: 0,
                    right: 0,
                }}>

                </View>
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


