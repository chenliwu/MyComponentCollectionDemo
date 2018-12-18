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
        // const dataList = [
        //     {id: 'beijing', name: '北京'},
        //     {id: 'shanghai', name: '上海'},
        //     {id: 'guangzhou', name: '广州'},
        //     {id: 'shenzhen', name: '深圳'},
        // ];

        ////添加数据
        const dataList = [];
        let item = {};
        for (let i = 0; i < 100; i++) {
            item = {};
            item.id = i + new Date().toDateString();
            item.name = i + new Date().toDateString();
            dataList.push(item);
        }

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
     * 创建头部布局
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


    _renderItem1 = ({item, index}) => {
        return (
            <DeleteSwipeRow
                item={item}
                onPressItem={(item) => {

                    //alert('onPressItem:' + item.id);
                }}
                onDeleteItem={(item) => {
                    //alert('onDeleteItem:' + item.id);
                    const dataList = this.state.dataList;
                    let list = dataList.filter(({id}) => id !== item.id);
                    this.setState({
                        dataList: list
                    });
                }}
            />
        )
    };


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

                <FlatList
                    data={this.state.dataList}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    renderItem={({item, index}) => {
                        return this._renderItem1({item, index});
                    }}
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
                />
            </View>
        );
    }

    componentWillUnmount(): void {
        //清空数据
        DeleteSwipeRow.currentOpenRow = null;
        DeleteSwipeRow.swipeRowMap && DeleteSwipeRow.swipeRowMap.clear();
        DeleteSwipeRow.swipeRowMap = null;
    }
}

/**
 * 2018-12-13
 * chenlw
 * work: 封装带有滑动删除功能的item行组件
 */
class DeleteSwipeRow extends React.Component {

    /**
     * 内部维护一个记住所有滑动组件行的map
     *
     * @type {Map<any, any>}
     */
    static swipeRowMap = new Map();

    /**
     * 当前已打开侧滑菜单的行
     * @type {null}
     */
    static currentOpenRow = null;

    constructor(props) {
        super(props);
    }


    render() {
        const {item, onPressItem, onDeleteItem} = this.props;
        return (
            <SwipeRow
                ref={(ref) => {
                    //记录对组件的引用
                    DeleteSwipeRow.swipeRowMap.set(item.id, ref);
                }}

                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}

                recalculateHiddenLayout={true}

                onSwipeValueChange={(obj)=>{
                    //console.log('onSwipeValueChange');
                    //console.log(obj);
                }}

                //回调以确定组件是否应更新
                shouldItemUpdate={({currentItem,newItem})=>{
                    console.log('shouldItemUpdate');
                    console.log(currentItem);
                    console.log(newItem);
                }}

                tension={20}    //打开关闭动画的张力
                disableRightSwipe={true}    //禁止右边滑动
                rightOpenValue={-60}        //右侧侧滑X的偏移量(负数)
                stopRightSwipe={-80}        //右侧侧侧滑X的最大偏移量(负数)
                onRowOpen={() => {
                    //滑动菜单打开前执行
                    if (DeleteSwipeRow.currentOpenRow &&
                        DeleteSwipeRow.currentOpenRow !== DeleteSwipeRow.swipeRowMap.get(item.id)) {
                        //当滑动其他行时，关闭当前已经打开滑动菜单的行；滑动当前行则不关闭
                        DeleteSwipeRow.currentOpenRow.closeRow();
                    }
                    DeleteSwipeRow.currentOpenRow = DeleteSwipeRow.swipeRowMap.get(item.id);
                }}
                onRowDidClose={() => {
                    //滑动菜单关闭后执行
                    if (DeleteSwipeRow.currentOpenRow &&
                        DeleteSwipeRow.currentOpenRow === DeleteSwipeRow.swipeRowMap.get(item.id)) {
                        //不是已打开行的不关闭
                        DeleteSwipeRow.currentOpenRow = null;
                    }
                }}
            >
                <View style={{
                    backgroundColor: 'red',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View></View>
                    <TouchableWithoutFeedback onPress={() => {
                        if (DeleteSwipeRow.currentOpenRow) {
                            DeleteSwipeRow.currentOpenRow.closeRow();
                            DeleteSwipeRow.currentOpenRow = null;
                        }
                        //回调删除事件
                        onDeleteItem && onDeleteItem(item);
                    }}>
                        <View style={{
                            //flex: 1,
                            //height: 50,
                            height: '100%',
                            width: 60,
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Text style={{color: '#FFF'}}>删除</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback onPress={() => {
                    if (DeleteSwipeRow.currentOpenRow) {
                        DeleteSwipeRow.currentOpenRow.closeRow();
                        DeleteSwipeRow.currentOpenRow = null;
                    }
                    //回调item的点击事件
                    onPressItem && onPressItem(item);
                }}>
                    <View style={{
                        //height: 50,
                        padding: 20,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                    }}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SwipeRow>
        );
    }
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
});

export default MySwipeListViewExample;
