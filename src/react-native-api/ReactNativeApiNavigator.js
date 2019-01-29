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


import NetInfoExample from './NetInfo/NetInfoExample';
import TestBaseNetInfoComponent from './NetInfo/TestBaseNetInfoComponent';
import TestNetInfoUtils from './NetInfo/TestNetInfoUtils';

class ReactNativeApiNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'react-native API学习',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'NetInfoExample',
            name: '设备联网状态——NetInfo'
        });
        dataList.push({
            id: 'TestBaseNetInfoComponent',
            name: '测试监听网络状态变化的base component'
        });
        dataList.push({
            id: 'TestNetInfoUtils',
            name: '测试监听网络状态变化的工具类'
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
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    ItemSeparatorComponent={() => <View
                        style={{height: 1, backgroundColor: '#f5f5f9',}}/>}
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


const ReactNativeApiNavigator = createStackNavigator(
    {
        ReactNativeApiNavigatorPage: {
            screen: ReactNativeApiNavigatorPage
        },

        NetInfoExample: {
            screen: NetInfoExample
        },

        TestBaseNetInfoComponent: {
            screen: TestBaseNetInfoComponent
        },

        TestNetInfoUtils: {
            screen: TestNetInfoUtils
        },


    },
    {
        initialRouteName: 'ReactNativeApiNavigatorPage',
        //headerMode: 'center'
    }
);

export default ReactNativeApiNavigator;

