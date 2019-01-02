/**
 * Create by lutn on 2018-04-17
 *
 */
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    BackHandler,
    ScrollView,
    StyleSheet,
    RefreshControl,
    Platform,
    Dimensions,
    Animated
} from 'react-native';

import px2dp from '../../utils/Px2dp';


const isIOS = Platform.OS == "ios"

const {width, height} = Dimensions.get('window');

const headH = px2dp(isIOS ? 140 : 120);

const InputHeight = px2dp(28);


export default class HomePage3 extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            location: "三里屯SOHO",
            scrollY: new Animated.Value(0),
            searchView: new Animated.Value(0),
            modalVisible: false,
            searchBtnShow: true,
            isRefreshing: false
        };
        this.SEARCH_BOX_Y = px2dp(isIOS ? 48 : 43);
        this.SEARCH_FIX_Y = headH - px2dp(isIOS ? 64 : 44);
        this.SEARCH_KEY_P = px2dp(58);
        this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y - this.SEARCH_BOX_Y;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp(0);
            return true;
        });
    }

    /**
     * 绘制头部组件
     * @returns {*}
     * @private
     */
    _renderHeader() {

        let searchY = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
            outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y]
        });

        let lbsOpaticy = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y],
            outputRange: [1, 0]
        });

        let keyOpaticy = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
            outputRange: [1, 1, 0]
        });

        return (
            <View style={styles.header}>
                <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
                    <Text>头部</Text>
                </Animated.View>

                <Animated.View style={{
                    marginTop: px2dp(15),
                    transform: [{
                        translateY: searchY
                    }]
                }}>
                    <Text>中部</Text>
                </Animated.View>

                <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
                    <Text>底部</Text>
                </Animated.View>

            </View>

        )

    }

    /**
     * 绘制固定的header组件
     *
     * 基本思路：
     * （1）初始化不显示固定的Header组件
     * （2）当ScrollView滑动时，使用Animated.event动态绑定固定的Header组件的布局样式
     * （3）显示或隐藏固定的Header组件
     *
     * @returns {*}
     * @private
     */
    _renderFixHeader() {
        let showY = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
            outputRange: [-9999, -9999, 0, 0]
        });
        return (
            <Animated.View style={[styles.header, {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: 'pink',
                height: px2dp(isIOS ? 64 : 44),
                paddingTop: px2dp(isIOS ? 25 : 10),
                transform: [
                    {translateY: showY}
                ]
            }]}>
                <Text>固定的header组件</Text>
            </Animated.View>
        );
    }


    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 2000)
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <ScrollView
                    onScroll={
                        //把contentOffset.y绑定给this.state.scrollY
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }}
                        }])
                    }
                    scrollEventThrottle={16}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['#ddd', '#0398ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    {this._renderHeader()}
                    <View style={{backgroundColor: "#fff", paddingBottom: 10}}>
                        <Text>头</Text>

                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>
                        <Text style={{height: 50,}}>sdlkfsdklsfkldflskdsdlkkds</Text>

                        <Text>底部</Text>

                    </View>

                </ScrollView>

                {this._renderFixHeader()}

            </View>

        )

    }

}


const styles = StyleSheet.create({

    header: {
        backgroundColor: "#0398ff",
        height: headH,
        paddingTop: px2dp(isIOS ? 30 : 10),
        paddingHorizontal: 16
    },
    lbsWeather: {
        height: InputHeight,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    keywords: {
        marginTop: px2dp(14),
        flexDirection: "row"
    },

});