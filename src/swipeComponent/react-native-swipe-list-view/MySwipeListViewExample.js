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
 * 2018-12-2
 * chenlw
 * work
 *
 * FlatList列表，增加滑动删除功能（使用SwipeRow组件）
 *
 */
class MySwipeListViewExample extends Component {


    static navigationOptions = {
        headerTitle: 'react-native-swipe-list-view'
    };

    constructor(props) {
        super(props);
        const dataList = [
            {id: 'beijing', name: '北京'},
            {id: 'shanghai', name: '上海'},
            {id: 'guangzhou', name: '广州'},
            {id: 'shenzhen', name: '深圳'},
        ];

        this.state = {
            dataList: dataList
        };
    }


    currentOpenRow = null;
    swipeRowMap = new Map();

    /**
     * 渲染item组件（数据行）
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        return (
            <SwipeRow
                ref={(ref) => {
                    this.swipeRowMap.set(item.id, ref);
                }}
                tension={20}    //打开关闭动画的张力
                disableRightSwipe={true}    //禁止右边滑动
                rightOpenValue={-60}    //右侧侧滑X的偏移量(负数)
                stopRightSwipe={-100}    //右侧侧侧滑X的最大偏移量(负数)
                onRowOpen={() => {
                    //当滑动行的动画处于开启状态时调用
                    if (this.currentOpenRow) {
                        this.currentOpenRow.closeRow();

                    }
                    this.currentOpenRow = this.swipeRowMap.get(item.id);
                }}
                onRowClose={() => {
                    //当滑动行的动画处于关闭状态时调用
                    if (this.currentOpenRow && this.currentOpenRow === this.swipeRowMap.get(item.id)) {
                        this.currentOpenRow = null;
                    }
                }}
            >
                <View style={{
                    backgroundColor: 'red',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    //padding: 15
                }}>
                    <View></View>
                    <TouchableWithoutFeedback onPress={() => {
                        //alert('删除' + item.id);
                        if (this.currentOpenRow) {
                            this.currentOpenRow.closeRow();
                            this.currentOpenRow = null;
                        }
                    }}>
                        <View style={{
                            height: 50, width: 60,
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Text style={{color: '#FFF'}}>删除</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback onPress={() => {
                    if (this.currentOpenRow) {
                        this.currentOpenRow.closeRow();
                        this.currentOpenRow = null;
                    }
                    //alert(item.id);
                }}>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        height: 50,
                    }}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SwipeRow>
        )
    };

    _renderItem1 = ({item, index}) => {
        return (
            <DeleteSwipeRow
                item={item}
                onPressItem={(item) => {
                    alert('onPressItem:' + item.id);
                }}
                onDeleteItem={(item) => {
                    alert('onDeleteItem:' + item.id);
                }}
            />
        )
    };


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.dataList}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#ddd',}}/>}
                    renderItem={({item, index}) => {
                        //return this._renderItem({item, index});
                        return this._renderItem1({item, index});
                    }}
                />
            </View>
        );
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
                tension={20}    //打开关闭动画的张力
                disableRightSwipe={true}    //禁止右边滑动
                rightOpenValue={-60}        //右侧侧滑X的偏移量(负数)
                stopRightSwipe={-80}        //右侧侧侧滑X的最大偏移量(负数)
                onRowOpen={() => {
                    //当滑动行的动画处于开启状态时调用
                    if (DeleteSwipeRow.currentOpenRow) {
                        DeleteSwipeRow.currentOpenRow.closeRow();
                    }
                    DeleteSwipeRow.currentOpenRow = DeleteSwipeRow.swipeRowMap.get(item.id);
                }}
                onRowClose={() => {
                    //当滑动行的动画处于关闭状态时调用
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
                            height: 50, width: 60,
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
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        height: 50,
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
