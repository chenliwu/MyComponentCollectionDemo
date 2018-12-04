import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Category from "./Category";


import {
    SafeAreaView
} from 'react-navigation';

/**
 * 筛选条件页面
 *
 */
export default class ConditionPage extends React.Component {

    /**
     * 2018-11-05 08:55
     * chenlw
     * work：替换teaset导航
     */
    static navigationOptions = {
        headerTitle: "筛选"
    };

    constructor(props) {
        super(props);

        ///准备的数据
        const dataList = [
            {
                name: '筛选标题1',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            },
            {
                name: '筛选标题2',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            },
            {
                name: '筛选标题3',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            }
        ];
        this.state = {
            dataList: dataList,
        };

    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList
                        // ListHeaderComponent={<CategoryHeader />}
                        ItemSeparatorComponent={() => <View
                            style={{height: 1, backgroundColor: '#f5f5f9',}}/>}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={this.state.dataList}
                    />
                    {this._renderFooter()}
                </View>
            </SafeAreaView>
        );
    }

    _keyExtractor = (item, index) => {
        return "index" + index;
    };

    /**
     * 渲染条件
     * @param item
     * @returns {XML}
     * @private
     */
    _renderItem = ({item}) => {
        return <Category item={item}/>;
    };





    _renderFooter = () => {


        return (
            <View style={{flexDirection: 'row', height: 40}}>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: '#fe8301'}]}
                                  onPress={() => {

                                  }}
                >
                    <Text style={styles.actionButtonText}>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton]}
                                  onPress={() => {
                                      this._onActionFinished()
                                  }}>
                    <Text style={styles.actionButtonText}>完成</Text>
                </TouchableOpacity>
            </View>
        );
    };

    /**
     * 筛选条件完成按钮
     * @private
     */
    _onActionFinished = () => {

    };
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row'
    },
    actionButton: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9e2a', height: 40
    },
    actionButtonText: {
        fontSize: 16, color: '#fff'
    },
});
