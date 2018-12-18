import React, {
    Component,
} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ListView,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

/**
 * 2018-12-28
 * chenlw
 * work
 *
 * 检查滑动删除组件偶然会出现红线的问题
 *
 */
class MySwipeListViewExample extends Component {


    static navigationOptions = {
        headerTitle: 'react-native-swipe-list-view'
    };

    constructor(props) {
        super(props);

        this.rowTranslateAnimatedValues = {};
        ////添加数据
        const dataList = [];
        let item = {};
        for (let i = 0; i < 100; i++) {
            item = {};
            item.id = i;
            item.name = i + new Date().toDateString();
            dataList.push(item);
            this.rowTranslateAnimatedValues[`${item.id}`] = new Animated.Value(1);
        }

        this.animationIsRunning = false;

        this.state = {
            //数据列表
            dataList: dataList,
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false
        };
    }


    /**
     * 绘制分割线
     */
    _renderItemSeparatorComponent = () => {
        return (
            <View
                style={{
                    height: 10,
                    backgroundColor: '#dfe3ec'
                }}
            />
        )
    };

    /**
     * 创建头部布局
     */
    _createListHeader() {
        return (
            <View style={styles.headView}>
                <Text style={{color: 'white'}}>
                    头部布局
                </Text>
            </View>
        )
    }

    /**
     * 创建尾部布局
     */
    _createListFooter() {
        return (
            <View style={styles.footerView}>
                <Text style={{color: 'white'}}>
                    底部底部
                </Text>
            </View>
        )
    }

    /**
     * 空布局
     */
    _createEmptyView = () => {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无列表数据，下啦刷新
                </Text>
            </View>
        );
    };

    // onSwipeValueChange = (swipeData) => {
    //     const {id, value} = swipeData;
    //     // 375 or however large your screen is (i.e. Dimensions.get('window').width)
    //     if (value < -375 && !this.animationIsRunning) {
    //         this.animationIsRunning = true;
    //         Animated.timing(this.rowTranslateAnimatedValues[id], {toValue: 0, duration: 200}).start(() => {
    //             const newData = [...this.state.dataList];
    //
    //             const prevIndex = this.state.dataList.findIndex(item => item.id === id);
    //
    //             newData.splice(prevIndex, 1);
    //
    //             this.setState({dataList: newData});
    //             this.animationIsRunning = false;
    //         });
    //     }
    // };


    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            alert('_onRefresh');
            setTimeout(() => {
                // let datalist = this.state.dataList;
                // let item = {};
                // for (let i = 0; i < 10; i++) {
                //     item = {};
                //     item.id = new Date();
                //     item.name = new Date();
                //     datalist.push(item);
                // }
                // this.setState({
                //     datalist: datalist
                // });
            }, 2000);
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore = () => {
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0) {
            alert('_onLoadMore');
        }
    };


    render() {
        return (
            <View style={styles.container}>

                <SwipeListView
                    useFlatList

                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //添加头尾布局
                    ListHeaderComponent={this._createListHeader}
                    ListFooterComponent={this._createListFooter}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    onEndReached={() => this._onLoadMore}
                    onEndReachedThreshold={0.1}

                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}

                    renderItem={(data, rowMap) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    // if (rowMap[data.item.id]) {
                                    //     //关闭滑动菜单栏
                                    //     rowMap[data.item.id].closeRow();
                                    // }
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    height: 50,
                                }}>
                                    <Text>I am {data.item.name} in a SwipeListView</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}

                    //renderHiddenItem绘制滑动菜单
                    renderHiddenItem={(data, rowMap) => (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: 'red',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    //alert(data.item.name);
                                    if (rowMap[data.item.id]) {
                                        //关闭滑动菜单栏
                                        rowMap[data.item.id].closeRow();
                                    }
                                }}>
                                <View style={{
                                    width: 60,
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                }}>
                                    <Text style={{color: '#fff', fontSize: 16}}>删除</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                    previewFirstRow={false}
                    disableRightSwipe={true}    //禁止右边滑动
                    rightOpenValue={-60}
                    stopRightSwipe={-80}        //右侧侧侧滑X的最大偏移量(负数)
                    tension={20}    //打开关闭动画的张力
                    closeOnRowPress={true}
                />
            </View>
        );
    }

    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
    };

    /**
     * 这个方法生成的关键字会作为方法回调参数
     * @param item
     * @param index
     * @returns {string}
     */
    keyExtractor = (item: any, index: number) => {
        //return index.toString();
        return item.id.toString();
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },


    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 60
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },

});

export default MySwipeListViewExample;
