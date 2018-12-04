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
class MySwipeExample extends Component {


    static navigationOptions = {
        headerTitle: 'react-native-swipe-list-view'
    };

    constructor(props) {
        super(props);
        let dataList = new Array();
        dataList.push({
            id: 'SwipeListViewExample',
            name: 'react-native-swipe-list-view侧滑组件'
        });

        this.state = {
            dataList: dataList
        };
    }

    /**
     * item点击事件
     * @param item
     * @private
     */
    _onPressItem = (item) => {
        alert("item:" + item.name);
    };

    /**
     * 渲染item组件（数据行）
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.standalone}>
                <SwipeRow
                    disableRightSwipe={true}
                    leftOpenValue={75}
                    //rightOpenValue={-75}
                >
                    <View style={styles.standaloneRowBack}>
                        <Text style={styles.backTextWhite}>Left</Text>
                        <Text style={styles.backTextWhite}>Right</Text>
                    </View>
                    <View style={styles.standaloneRowFront}>
                        <Text>{item.name}</Text>
                    </View>
                </SwipeRow>
            </View>
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

                <View style={styles.standalone}>
                    <SwipeRow
                        disableRightSwipe={true}
                        leftOpenValue={75}
                        //rightOpenValue={-75}
                    >
                        <View style={styles.standaloneRowBack}>
                            <Text style={styles.backTextWhite}>Left</Text>
                            <Text style={styles.backTextWhite}>Right</Text>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text>I am a standalone SwipeRow</Text>
                        </View>
                    </SwipeRow>
                </View>

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

export default MySwipeExample;
