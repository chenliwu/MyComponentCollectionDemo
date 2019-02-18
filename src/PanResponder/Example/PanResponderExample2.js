import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Text,
    ScrollView,
    StatusBar,
    Easing,
    Platform, LayoutAnimation
} from 'react-native';
import PhoneModelUtils from "../../utils/PhoneModelUtils";
import {SafeAreaView} from "react-navigation";

const globalHeaderHeight = 60;

const isIphoneX = PhoneModelUtils.isIphoneX();

const isAndroid = Platform.OS === 'android';
const statusBarHeight = isAndroid ? StatusBar.currentHeight : 20;

const ROOT_VIEW_PADDING_TOP = isAndroid ? 0 : (isIphoneX ? 44 : 20);


//paddingTop:
// ios刘海屏   globalHeaderHeight + 44；
// ios非刘海屏  globalHeaderHeight + statusBarHeight
// android  globalHeaderHeight
const ROOT_VIEW_HEADER_HEIGHT = isAndroid ? globalHeaderHeight :
    (isIphoneX ? (globalHeaderHeight + 44) : (globalHeaderHeight + statusBarHeight));


/**
 *
 原生事件是指由以下字段组成的合成触摸事件

 ////
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

 /////
 gestureState 对象有如下的字段：

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
export default class PanResponderExample2 extends React.Component {


    static navigationOptions = ({navigation, screenProps}) => {

        const headerVisible = navigation.getParam('headerVisible', true);

        if (headerVisible) {
            return ({
                title: 'View组件手势监控',
                headerStyle: {
                    height: globalHeaderHeight,
                    backgroundColor: 'red',
                },
                headerTransparent: true,
            });
        } else {
            return ({
                headerLeft: <View/>,
                headerTitle: <View/>,
                //title: 'ScrollView手势操作',
                headerStyle: {
                    height: 0,
                    backgroundColor: 'red',
                },
                headerTransparent: true,
            });
        }
    };


    finalY0 = 0;     //记录最近一次移动时的屏幕纵坐标

    constructor(props) {
        super(props);
        this.state = {

            scrollViewContentOffsetYAnimation: new Animated.Value(ROOT_VIEW_HEADER_HEIGHT),//初始化动画值

            swipeState: '未滑动', //记录滑动手势方向


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
                const vy = gesturesState.vy;            //当前的纵向移动速度

                //gestureState.vy（当前的纵向移动速度）的值小于0时，表示手势往上滑动，ScrollView的组件往上滚动；
                // 值大于0时，表示手势往下滑动，ScrollView的组件往下滚动。

                if (vy > 0) {       //手势往下滑动
                    this.showHeader();
                    // this.setState({
                    //     swipeState: '手势往下滑动',
                    // });
                } else {    //手势往上滑动
                    this.hideHeader();
                    // this.setState({
                    //     swipeState: '手势往上滑动',
                    // });
                }


            },
            onPanResponderRelease: (event, gesturesState) => {
                //触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。

            }
        });
    }

    componentWillUnmount() {

    }


    /**
     * 设置布局动画
     */
    setLayoutAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        //LayoutAnimation.configureNext(CustomLayoutAnimation);
    };

    hideHeader = () => {
        this.setLayoutAnimation();
        this.props.navigation.setParams({
            headerVisible: false,
        });

        Animated.timing(this.state.scrollViewContentOffsetYAnimation, {
            toValue: 0,
            duration: 300
        }).start(()=>{

        });

        // setTimeout(() => {
        //     Animated.timing(this.state.scrollViewContentOffsetYAnimation, {
        //         toValue: 0,
        //         duration: 300
        //     }).start();
        // }, 20);

    };

    showHeader = () => {
        this.setLayoutAnimation();
        Animated.timing(this.state.scrollViewContentOffsetYAnimation, {
            toValue: ROOT_VIEW_HEADER_HEIGHT,
            duration: 300
        }).start(()=>{
            setTimeout(() => {
                this.setLayoutAnimation();
                this.props.navigation.setParams({
                    headerVisible: true,
                });
            }, 20);
        });




    };


    render() {
        return (
            <View
                style={styles.container}
                {...this._panResponder.panHandlers}
            >


                <Animated.View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: 'blue',
                        height: this.state.scrollViewContentOffsetYAnimation.interpolate({
                            inputRange: [0, ROOT_VIEW_HEADER_HEIGHT],
                            outputRange: [ROOT_VIEW_PADDING_TOP, ROOT_VIEW_HEADER_HEIGHT],
                            easing: Easing.linear,      //配置渐变函数
                            extrapolate: 'clamp',        //不允许超出区间
                            extrapolateRight: 'clamp'
                        }),
                    }}
                >
                    {/*<Text>滑动改变组件高度</Text>*/}
                </Animated.View>


                <Text style={{
                    height: 50,
                    marginBottom: 20,
                }}>手势滑动方向：{this.state.swipeState}</Text>
                <ScrollView>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                    <Text style={{height: 100}}>text</Text>
                </ScrollView>

            </View>
        );
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
