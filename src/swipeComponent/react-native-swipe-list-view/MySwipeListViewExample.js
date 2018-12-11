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
    View
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
                disableRightSwipe={true}
                //leftOpenValue={75}
                rightOpenValue={-60}
                stopRightSwipe={-80} //右侧侧侧滑X的最大偏移量(负数)
                onRowOpen={(obj) => {
                    //当滑动行的动画处于开启状态时调用
                    if (this.currentOpenRow && this.currentOpenRow.isOpen) {
                        this.currentOpenRow.closeRow();
                        this.currentOpenRow = this.swipeRowMap.get(item.id);
                    } else {
                        this.currentOpenRow = this.swipeRowMap.get(item.id);
                    }
                    console.log('onRowOpen');
                    console.log(this.currentOpenRow);
                }}
                onRowClose={(obj) => {
                    //当滑动行的动画处于关闭状态时调用
                    console.log('onRowClose');
                    console.log(this.currentOpenRow);
                    if (this.currentOpenRow) {
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
                        alert('删除'+item.id);
                    }}>
                        <View style={{
                            height:50,width:60,
                            justifyContent:'center',alignItems:'center',
                        }}>
                            <Text style={{color: '#FFF'}}>删除</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback onPress={() => {
                    if (this.currentOpenRow && this.currentOpenRow.isOpen) {
                        this.currentOpenRow.closeRow();
                        this.currentOpenRow = null;
                    }
                }}>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: '#CCC',
                        justifyContent: 'center',
                        height: 50,
                    }}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SwipeRow>
        )
    };


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.dataList}
                    renderItem={({item, index}) => {
                        return this._renderItem({item, index});
                    }}
                />

                {/*<View style={styles.standalone}>*/}
                {/*<SwipeRow*/}
                {/*disableRightSwipe={true}*/}
                {/*leftOpenValue={75}*/}
                {/*//rightOpenValue={-75}*/}
                {/*>*/}
                {/*<View style={styles.standaloneRowBack}>*/}
                {/*<Text style={styles.backTextWhite}>Left</Text>*/}
                {/*<Text style={styles.backTextWhite}>Right</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.standaloneRowFront}>*/}
                {/*<Text>I am a standalone SwipeRow</Text>*/}
                {/*</View>*/}
                {/*</SwipeRow>*/}
                {/*</View>*/}

            </View>
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
