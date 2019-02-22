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

import ScrollViewPanResponderExample from './Example/ScrollViewPanResponderExample';
import ScrollViewPanResponderExample_1 from './Example/ScrollViewPanResponderExample_1';
import ScrollViewPanResponderExample_2 from './Example/ScrollViewPanResponderExample_2';


class ScrollViewPanResponderNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'ScrollView手势Example',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'ScrollViewPanResponderExample',
            name: 'ScrollViewPanResponderExample手势操作'
        });
        dataList.push({
            id: 'ScrollViewPanResponderExample_1',
            name: 'ScrollViewPanResponderExample手势操作1'
        });
        dataList.push({
            id: 'ScrollViewPanResponderExample_2',
            name: 'ScrollView判断滚动方向'
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


const ScrollViewPanResponderNavigator = createStackNavigator(
    {
        ScrollViewPanResponderNavigatorPage: {
            screen: ScrollViewPanResponderNavigatorPage
        },

        ScrollViewPanResponderExample: {
            screen: ScrollViewPanResponderExample
        },
        ScrollViewPanResponderExample_1: {
            screen: ScrollViewPanResponderExample_1
        },
        ScrollViewPanResponderExample_2: {
            screen: ScrollViewPanResponderExample_2
        },


    },
    {
        initialRouteName: 'ScrollViewPanResponderNavigatorPage',
    }
);

ScrollViewPanResponderNavigator.navigationOptions = ({navigation}) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }

    return {
        drawerLockMode,
    };
};

export default ScrollViewPanResponderNavigator;


