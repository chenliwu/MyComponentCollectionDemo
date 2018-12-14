import React from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';

import MySpringAnimation from './MySpringAnimation';


const screenWidth = Dimensions.get('window').width;

/**
 * 2018-12-13
 * chenlw
 * work：  ScrollView组件API学习
 */
export default class ScrollViewExample1 extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        const headerTitle = navigation.getParam('headerTitle', "");
        const headerVisibleFlag = navigation.getParam('headerVisibleFlag', 0);
        if (headerVisibleFlag === 2) {
            return ({
                headerStyle: {
                    //marginBottom: -50,
                },
                // header:<View width={screenWidth} height={50}
                //     style={{ height: 50, width: '100%', backgroundColor: 'red'}}></View>,
                header: null,
                headerLeft: null,
                headerTransparent: true,
                //禁止打开菜单
                drawerLockMode: "locked-closed",
                //允许使用返回手势
                gesturesEnabled: true,
            });

        }
        return ({
            headerTitle: headerTitle,
            //禁止打开菜单
            drawerLockMode: "locked-closed",
            //允许使用返回手势
            gesturesEnabled: true,
        });

    };

    constructor(props) {
        super(props);
        this.ScrollView = null;

        this._top = 500;
        this.state = {
            topValue: new Animated.Value(this._top),
            swipeDirection:'',
        };
        this._panResponder = null;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (event, gestureState) => {
                console.log('onPanResponderGrant');
                console.log(gestureState);
                console.log('nativeEvent----');
                console.log(event.nativeEvent);
                console.log('nativeEvent----');
                this._handlePanResponderGrant(event, gestureState);

                if (gestureState.dy > 0) {
                    this.setState({
                        swipeDirection:'向上滑动',
                    });
                    if (this._previousScrollValue == this._switchScrollBottom) {

                    }
                }else{
                    this.setState({
                        swipeDirection:'向下滑动',
                    });
                }

                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (event, gestureState) => {
                console.log('onPanResponderMove');
                console.log(gestureState);
                console.log('nativeEvent----');
                console.log(event.nativeEvent);
                console.log('nativeEvent----');
                // 最近一次的移动距离为gestureState.move{X,Y}
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (event, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                console.log('onPanResponderRelease');
                console.log(gestureState);

                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }

    // 在申请成功时候保存上次滚动
    _handlePanResponderGrant = (event, gestureState) => {
        this._previousScrollValue = this._switchScrollBottom
    };

    _handlePanResponderEnd = (event, gestureState) => {
        // 如果上次滚动和这次滚动位置的值一样，证明没有滚动， 已经到达顶部了。
        // 这时候则触发移动至 bottom 的动画
        if (gestureState.dy > 0) {
            this.setState({
                swipeDirection:'向上滑动',
            });
            if (this._previousScrollValue == this._switchScrollBottom) {

            }
        }else{
            this.setState({
                swipeDirection:'向下滑动',
            });
        }
    };


    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <Text>手势滑动方向：{this.state.swipeDirection}</Text>
                <ScrollView
                    {...this._panResponder.panHandlers}
                    ref={(ref) => {
                        this.ScrollView = ref;
                    }}
                    // style={{
                    //     flex:1,
                    //     position: 'absolute',
                    //     top: 500,
                    //     height: 1500,
                    //     backgroundColor:'pink'
                    // }}
                    onScroll={this._handleScrollEnd} // 每次滚动记录滚动位置
                    scrollEventThrottle={16} // 设置 onScroll 触发频率，一般为 16
                >
                    {
                        this.renderItem()
                    }
                </ScrollView>
            </View>
        )
    }


    _handleScrollEnd = (event) => {
        this._switchScrollBottom = event.nativeEvent.contentOffset.y;// 保存最后滚动位置
    };


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