import React from 'react';
import {
    View,
    Text,
    Button,
    Image,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


/**
 * 2018-12-27
 * chenlw
 * work：  Animated.event学习
 *
 手动控制动画的核心API是Animated.event

 手势，如平移或滚动，以及其他事件可以使用Animated.event()直接映射到动画值。
 这是通过结构化映射语法完成的，以便可以从复杂的事件对象中提取值。
 第一层参数是一个数组，你可以在其中指定多个参数映射，这种映射可以是嵌套的对象。

 学习总结：
 1、插值函数interpolate
 这个函数实现了数值大小、单位的映射转换，允许一个输入的区间范围映射到另外一个输入的区间范围。
 （1）inputRange：限定了输入数据的范围，即interpolate函数只处理这个范围的变化，将其映射到输出值。(输入值的区间，即响应动画的输入区间)

 （2）outputRange：声明输出值的范围。例如opacity透明度设置，通常设置为[1.0,0]（透明度由1到0）或者[0,1.0]（透明度由0到1）。(输出值的区间，即动画变化的区间)

 2、当ScrollView滑动时，会触发onScroll滚动事件，onScroll回调函数的参数为event，这个event.nativeEvent记录了滚动的相关数据，比如滚动的位置。
 在这个例子当中，我们把把event.nativeEvent.contentOffset.x绑定给this.scrollViewOffsetXAnimation，这个绑定完成后就会触发
 插值函数interpolate，然后就会逐渐改变组件的透明度，这样动画的效果就出来了。


 *
 *
 */
export default class AnimatedExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        return ({
            headerTitle: 'Animated.event学习',
            //禁止打开菜单
            //drawerLockMode: "locked-closed",
            //允许使用返回手势
            //gesturesEnabled: true,
        });

    };

    scrollViewOffsetXAnimation = new Animated.Value(0);
    scrollViewOffsetXAnimationListenerId = null;

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.addScrollViewOffsetXAnimationListener();
    }

    componentWillUnmount() {
        this.removeScrollViewOffsetXAnimationListener();
    }


    addScrollViewOffsetXAnimationListener = () => {
        this.scrollViewOffsetXAnimationListenerId = this.scrollViewOffsetXAnimation.addListener((value) => {
            console.log('scrollViewOffsetXAnimation.addListener');
            console.log(value);
        });
    };

    removeScrollViewOffsetXAnimationListener = () => {
        if (this.scrollViewOffsetXAnimationListenerId) {
            this.scrollViewOffsetXAnimation.removeListener(this.scrollViewOffsetXAnimationListenerId);
        }
    };


    _onScroll = (event) => {
        console.log('_onScroll');
        console.log(event);
    };


    /**
     * 手动控制动画
     * 根据Scroll或者手势来手动的控制动画的过程
     * @returns {*}
     */
    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <ScrollView
                    horizontal={true} //水平滑动
                    showsHorizontalScrollIndicator={false}
                    style={{
                        width: deviceWidth,
                        height: deviceHeight
                    }}

                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    //把contentOffset.x绑定给this.state.xOffset
                                    //x: this.state.xOffset,
                                    x: this.scrollViewOffsetXAnimation,
                                }
                            }
                        }],

                        {listener: this._onScroll},
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={16}//onScroll回调间隔
                >
                    <Animated.Image source={require('./../../assets/airport-photo.jpg')}
                                    style={{
                                        height: deviceHeight,
                                        width: deviceWidth,
                                        //interpolate映射动画值，触发动画
                                        //outputRange:映射到0.0,1.0之间
                                        //inputRange:输入的值只处理0-375之间
                                        opacity: this.scrollViewOffsetXAnimation.interpolate({
                                            inputRange: [0, 375],
                                            outputRange: [1, 0]
                                        }),
                                    }}
                                    resizeMode="cover"
                    />
                    <Animated.Image
                        source={require('./../../assets/calendar-body.png')}
                        style={{
                            height: deviceHeight,
                            width: deviceWidth
                        }}
                        resizeMode="cover"
                    />
                    <Animated.Image source={require('./../../assets/chatheads-face1.jpg')}
                                    style={{
                                        height: deviceHeight,
                                        width: deviceWidth
                                    }}
                                    resizeMode="cover"
                    />
                </ScrollView>
            </View>
        );
    }


}
