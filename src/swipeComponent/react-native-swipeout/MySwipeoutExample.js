//  include react-native-swipeout
import Swipeout from 'react-native-swipeout';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';

/**
 * 2018-12-3
 * chenlw
 * work：测试测滑组件
 *
 *
 */
class MySwipeoutExample extends Component {

    constructor() {
        super();
        const dataList = new Array();
        dataList.push({id: 1, name: 'item1'});
        dataList.push({id: 2, name: 'item2'});
        dataList.push({id: 3, name: 'item3'});
        this.state = {
            dataList: dataList,
            sectionID: null,
            rowID: null,
            isOpenSwipeRow: false,
        };
    }

    _keyExtractor = (item: any, index: number) => {
        return index.toString();
    };

    _renderItem = ({item, index}) => {
        console.log("render item");
        console.log(item);
        const swipeoutBtns = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    alert("删除" + item.name);
                },
            }
        ];
        return (
            <Swipeout
                close={false}
                rowID={index}
                sectionID={index}
                right={swipeoutBtns}
                autoClose={true}
                onOpen={(sectionID, rowID) => {
                    //
                    // console.log("swipe onOpen");
                    // console.log(item);
                    // console.log("sectionID:" + sectionID);
                    // console.log("rowID:" + rowID);
                    // this.setState({
                    //     //记录选中的滑动组件
                    //     sectionID,
                    //     rowID,
                    //     isOpenSwipeRow: true
                    // })
                }}
                onClose={() => {

                }}
                scroll={event => {

                }}
            >

                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: '#fff'
                    }}
                    onPress={() => {
                        alert("click" + item.name);
                    }}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </Swipeout>
        );
    };

    render() {

        return (
            <View style={{
                flex: 1
            }}>
                <FlatList
                    renderItem={this._renderItem}
                    data={this.state.dataList}
                    keyExtractor={this._keyExtractor}/>

            </View>
        );
    }

}

export default MySwipeoutExample;