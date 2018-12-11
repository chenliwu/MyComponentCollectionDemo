import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator
} from 'react-navigation';

import SwipeListViewExample from './react-native-swipe-list-view/SwipeExample';
import MySwipeListViewExample from './react-native-swipe-list-view/MySwipeListViewExample';


import SwipeoutExample from './react-native-swipeout/SwipeoutExample';
import MySwipeoutExample from './react-native-swipeout/MySwipeoutExample';

import SwipeableExample from './react-native-swipeable/SwipeableExample';
import MySwipeableExample from './react-native-swipeable/MySwipeableExample';


import MySwipeComponent from './MySwipeComponent/MySwipeExample';
import SwipeableFlatListExample from './SwipeableFlatList/SwipeableFlatList';

class SwipeComponentNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: '侧滑组件',
        drawerLabel: '侧滑组件',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'SwipeListViewExample',
            name: 'react-native-swipe-list-view'
        });
        dataList.push({
            id: 'SwipeoutExample',
            name: 'react-native-swipeout'
        });
        dataList.push({
            id: 'SwipeableExample',
            name: 'react-native-swipeable'
        });
        dataList.push({
            id: 'MySwipeableExample',
            name: 'react-native-swipeable集成'
        });

        dataList.push({
            id: 'MySwipeComponent',
            name: '自定义滑动删除组件'
        });

        dataList.push({
            id: 'SwipeableFlatListExample',
            name: '官方侧滑组件SwipeableFlatList'
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
                key={index}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'red'
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
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    data={this.state.dataList}

                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#ddd',}}/>}
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
        SwipeComponentNavigatorPage: {
            screen: SwipeComponentNavigatorPage
        },


        SwipeListViewExample: {
            //screen: SwipeListViewExample
            screen: MySwipeListViewExample
        },

        SwipeableExample: {
            screen: SwipeableExample
        },



        MySwipeableExample: {
            screen: MySwipeableExample
        },

        SwipeoutExample: {
            screen: MySwipeoutExample
        },
        MySwipeComponent: {
            screen: MySwipeComponent
        },

        SwipeableFlatListExample: {
            screen: SwipeableFlatListExample
        },
    },
    {
        initialRouteName: 'SwipeComponentNavigatorPage',
        //headerMode: 'center'
    }
);

