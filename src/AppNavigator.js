import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';

///滑动删除组件
import SwipeListViewExample from './swipeComponent/react-native-swipe-list-view/SwipeExample';
import MySwipeExample from './swipeComponent/react-native-swipe-list-view/MySwipeExample';

import SwipeoutExample from './swipeComponent/react-native-swipeout/SwipeoutExample';
import MySwipeoutExample from './swipeComponent/react-native-swipeout/MySwipeoutExample';

import {
    SafeAreaView,
    createStackNavigator
} from 'react-navigation';

/**
 * 2018-12-2
 * FlatList常用属性 props
 * （1）data：指定要显示的数据列表，这是一个数组。data属性目前只支持普通数组结构，不支持其他数据结构。
 * （2）renderItem：渲染数据行的函数。参数为Item，即数组的成员
 *      renderItem: (info: {item: ItemT, index: number}) => ?React.Element<any> #
 *
 *
 *
 */

class AppNavigatorPage extends Component {

    static navigationOptions = {
        headerTitle: 'AppNavigatorPage'
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'SwipeListViewExample',
            name: 'react-native-swipe-list-view侧滑组件'
        });
        dataList.push({
            id: 'SwipeoutExample',
            name: 'react-native-swipeout侧滑组件'
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
        //alert("item:" + item.name);
        this.props.navigation.push(item.id);
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
                    backgroundColor: 'red'
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
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
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
        AppNavigatorPage: {
            screen: AppNavigatorPage
        },
        SwipeListViewExample: {
            screen: SwipeListViewExample
            //screen: MySwipeExample
        },
        SwipeoutExample:{
            //screen:SwipeoutExample
            screen:MySwipeoutExample
        }
    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


