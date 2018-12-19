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
} from 'react-native';

/**
 * ScrollView手势操作
 */
export default class ScrollViewPanResponderExample extends Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return ({
            headerTitle: 'ScrollView手势操作',
        });

    };

    constructor(props) {
        super(props);
        this.state = {
            swipePositionY: 0,   //记录ScrollView滑动停止的Y轴位置
            swipeState: '未滑动',
        }
    }

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {
        let swipePositionY = this.state.swipePositionY;
        let Y = event.nativeEvent.contentOffset.y;

        //通过比较swipePositionY与event.nativeEvent.contentOffset.y，判断滑动方向
        if (Y >= swipePositionY) {
            //往下滑动
            this.setState({
                swipeState:'往下滑动',
            });
        } else {
            //往上滑动
            this.setState({
                swipeState:'往上滑动',
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
    _onScrollBeginDrag= (event)=>{
        //console.log('_onScrollBeginDrag');
        //console.log('Y='+event.nativeEvent.contentOffset.y);
        //console.log(event.nativeEvent);
        // let swipePositionY = this.state.swipePositionY;
        // let Y = event.nativeEvent.contentOffset.y;
        // //通过比较swipePositionY与event.nativeEvent.contentOffset.y，判断滑动方向
        // if (Y >= swipePositionY) {
        //     //往下滑动
        //     this.setState({
        //         swipeState:'往下滑动',
        //     });
        // } else {
        //     //往上滑动
        //     this.setState({
        //         swipeState:'往上滑动',
        //     });
        // }
    };

    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        console.log('_onScrollEndDrag');
        console.log('Y='+event.nativeEvent.contentOffset.y);
        let Y = event.nativeEvent.contentOffset.y;
        //记录ScrollView停留的Y轴位置，用于判断滑动方向
        this.setState({
            swipePositionY: Y,
        });
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


