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

/**
 * 自定义动画
 * @type {{duration: number, create: {type: *, property: *}, update: {type: *}}}
 */
const CustomLayoutAnimation = {
    duration: 150,
    create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
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
            headerHeight: globalHeaderHeight
        }
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
    setHeaderHeight=(height)=>{
        this.props.navigation.setParams({
            headerHeight: height,
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

        this.setLayoutAnimation();


        ////处理Header组件
        if (Y > globalHeaderHeight) {
            //动态改变header的高度
            this.setHeaderHeight(0);
        } else {
            this.setHeaderHeight(globalHeaderHeight);
        }




        if (Y <= absoluteViewHeight / 2) {
            //往上滑动，显示绝对定位的组件
            if (this.state.absoluteBottom < 0) {
                this.setState({
                    absoluteBottom: 0,
                });
            }
        }

        //通过比较swipePositionY与event.nativeEvent.contentOffset.y，判断滑动方向
        if (Y >= swipePositionY && Y >= 0) {
            //往下滑动时，隐藏绝对定位的组件
            if (this.state.absoluteBottom == 0) {
                this.setState({
                    absoluteBottom: -absoluteViewHeight,
                });
            }
            this.setState({
                swipeState: '往下滑动',
            });
        } else {
            //往上滑动，显示绝对定位的组件
            if (this.state.absoluteBottom < 0) {
                this.setState({
                    absoluteBottom: 0,
                });
            }
            this.setState({
                swipeState: '往上滑动',
            });
        }

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
        console.log('_onScrollEndDrag');
        console.log('Y=' + event.nativeEvent.contentOffset.y);
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
                    scrollEventThrottle={5}
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
                <View style={{
                    position: 'absolute',
                    height: absoluteViewHeight,
                    backgroundColor: 'red',
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


