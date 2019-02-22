'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';

const SCROLLVIEW_DIRECTION_UP = 0;     //表示ScrollView组件往上滚动
const SCROLLVIEW_DIRECTION_DOWN = 1;   //表示ScrollView组件往下滚动


/**
 * 2019-02-22
 * chenlw
 * ScrollView判断滚动方向
 */
export default class ScrollViewPanResponderExample_2 extends Component {

    scrollViewStartOffsetY = 0;         //用于记录手指开始滑动时ScrollView组件的Y轴偏移量，通过这个变量可以判断滚动方向
    scrollViewScrollDirection = 0;      //ScrollView组件滚动的方向：0往上；1往下

    static navigationOptions = ({navigation, screenProps}) => {
        return ({
            title: 'ScrollView判断滚动方向',
        });

    };

    constructor(props) {
        super(props);
        this.state = {
            scrollViewScrollDirection: '',   //ScrollView组件滚动的方向
        }
    }

    /**
     * 滑动开始回调事件
     *
     * 注意：当刚刚开始滑动时，event.nativeEvent.contentOffset.y仍然是上次滑动的值，没有变化
     *
     * @param event
     * @private
     */
    _onScrollBeginDrag = (event) => {
        //event.nativeEvent.contentOffset.y表示Y轴滚动的偏移量
        const offsetY = event.nativeEvent.contentOffset.y;
        //记录ScrollView开始滚动的Y轴偏移量
        this.scrollViewStartOffsetY = offsetY;
    };

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {

        const offsetY = event.nativeEvent.contentOffset.y;
        if (this.scrollViewStartOffsetY > offsetY) {
            //手势往下滑动，ScrollView组件往上滚动
            //console.log('手势往下滑动，ScrollView组件往上滚动');
            this.scrollViewScrollDirection = SCROLLVIEW_DIRECTION_UP;
            this.setState({
                scrollViewScrollDirection: 'ScrollView组件往上滚动'
            });
        } else if (this.scrollViewStartOffsetY < offsetY) {
            //手势往上滑动，ScrollView组件往下滚动
            //console.log('手势往上滑动，ScrollView组件往下滚动');
            this.scrollViewScrollDirection = SCROLLVIEW_DIRECTION_DOWN;
            this.setState({
                scrollViewScrollDirection: 'ScrollView组件往下滚动'
            });
        }
    };


    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        //console.log('_onScrollEndDrag');
        //console.log('Y=' + event.nativeEvent.contentOffset.y);
    };


    render() {
        return (
            <View>
                <Text>ScrollView滚动方向：{this.state.scrollViewScrollDirection}</Text>
                <ScrollView
                    onScroll={this._onScroll}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={this._onScrollEndDrag}
                    scrollEventThrottle={16}    //设置16，一帧回调一次这个onScroll方法
                >
                    <Text style={{height: 30, backgroundColor: 'pink'}}>--------1111111---------</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>

                </ScrollView>

            </View>
        )
    }


}




