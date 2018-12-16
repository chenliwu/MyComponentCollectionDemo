import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    PanResponder
} from 'react-native';

const SQUARE_DIMENSIONS = 100;

/**
 *
 原生事件是指由以下字段组成的合成触摸事件
 nativeEvent 字段属性
     changedTouches - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
     identifier - 触摸点的 ID
     locationX - 触摸点相对于父元素的横坐标
     locationY - 触摸点相对于父元素的纵坐标
     pageX - 触摸点相对于根元素的横坐标
     pageY - 触摸点相对于根元素的纵坐标
     target - 触摸点所在的元素 ID
     timestamp - 触摸事件的时间戳，可用于移动速度的计算
     touches - 当前屏幕上的所有触摸点的集合

 gestureState对象有如下的字段：
     stateID - 触摸状态的 ID。在屏幕上有至少一个触摸点的情况下，这个 ID 会一直有效。
     moveX - 最近一次移动时的屏幕横坐标
     moveY - 最近一次移动时的屏幕纵坐标
     x0 - 当响应器产生时的屏幕坐标
     y0 - 当响应器产生时的屏幕坐标
     dx - 从触摸操作开始时的累计横向路程
     dy - 从触摸操作开始时的累计纵向路程
     vx - 当前的横向移动速度
     vy - 当前的纵向移动速度
     numberActiveTouches - 当前在屏幕上的有效触摸点的数量
 *
 *
 */
export default class PanResponderExample extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY()
        }
    }


    /**
     * 一般在组件的componentWillMount生命周期方法创建手势处理器
     */
    componentWillMount() {
        this._animatedValueX = 0;
        this._animatedValueY = 0;

        //添加监听器
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (event, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                this.state.pan.setOffset({
                    x: this._animatedValueX,
                    y: this._animatedValueY
                });
                this.state.pan.setValue({
                    x: 0,
                    y: 0
                });
            },
            // onPanResponderMove:最近一次的移动距离为gestureState.move{X,Y}
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                },
            ]),
            onPanResponderRelease: () => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。

                //spring弹跳动画
                Animated.spring(this.state.pan, {
                    toValue: 0
                }).start();
            }
        });
    }

    componentWillUnmount() {
        //移除监听器
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    getStyle() {
        return [
            styles.square,
            {
                //transform是一个有序数组，动画按顺序执行
                transform: [
                    {
                        translateX: this.state.pan.x
                    },
                    {
                        translateY: this.state.pan.y
                    },
                    {
                        //rotate 旋转动画
                        rotate: this.state.pan.x.interpolate({
                            inputRange: [-200, 0, 200],
                            outputRange: ["-30deg", "0deg", "30deg"]
                        })
                    }
                ]
            },
            {
                //opacity设置组件的透明度
                opacity: this.state.pan.x.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [0.5, 1, 0.5]
                })
            }
        ];
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={this.getStyle()}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: SQUARE_DIMENSIONS,
        height: SQUARE_DIMENSIONS,
        backgroundColor: 'blue'
    }
});
