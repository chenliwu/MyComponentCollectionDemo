import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator
} from 'react-navigation';

import PopupDialogExample from './react-native-popup-dialog/PopupDialogExample';

import LoadingDialogExample from './react-native-popup-dialog/LoadingDialogExample';
import InputDialogExample from './react-native-popup-dialog/InputDialogExample';
import TestBaseDialogComponentExample from './react-native-popup-dialog/TestBaseDialogComponentExample';


class DialogsComponentNavigator extends React.Component{

    static navigationOptions = {
        headerTitle: '对话框',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'PopupDialogExample',
            name: 'react-native-popup-dialog对话框'
        });
        dataList.push({
            id: 'LoadingDialogExample',
            name: '加载对话框'
        });
        dataList.push({
            id: 'InputDialogExample',
            name: '输入对话框'
        });

        dataList.push({
            id: 'TestBaseDialogComponentExample',
            name: '测试基类Dialog'
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
        this.props.navigation.navigate(item.id);
    };

    /**
     * 渲染item组件（数据行）
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    this._onPressItem(item);
                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>

        )
    };


    render() {
        return (
            <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    ItemSeparatorComponent={() => <View
                        style={{ height: 1, backgroundColor: '#f5f5f9', }} />}
                    data={this.state.dataList}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={({item, index}) => {
                        return this._renderItem({item, index});
                    }}

                    getItemLayout={(item, index) => (
                        {length: 50, offset: (50 + 2) * index, index}
                    )}

                />
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {
        DialogsComponentNavigator:{
            screen:DialogsComponentNavigator
        },
        PopupDialogExample:{
            screen:PopupDialogExample,
        },
        LoadingDialogExample:{
            screen:LoadingDialogExample,
        },
        InputDialogExample:{
            screen:InputDialogExample,
        },
        TestBaseDialogComponentExample:{
            screen:TestBaseDialogComponentExample,
        },
    },
    {
        initialRouteName: 'DialogsComponentNavigator',
        //headerMode: 'center'
    }
);


