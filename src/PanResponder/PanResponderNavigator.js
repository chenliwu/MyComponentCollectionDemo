import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Easing,
    Animated
} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator
} from 'react-navigation';

import PanResponderExample from './Example/PanResponderExample';
import PanResponderExample1 from './Example/PanResponderExample1';
import PanResponderExample2 from './Example/PanResponderExample2';


class PanResponderNavigator extends React.Component {

    static navigationOptions = {
        headerTitle: 'PanResponder手势响应',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'PanResponderExample',
            name: '手势操作demo1'
        });

        dataList.push({
            id: 'PanResponderExample1',
            name: '手势参数观察'
        });

        dataList.push({
            id: 'PanResponderExample2',
            name: 'View手势监控demo'
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


const AnimationNavigator = createStackNavigator(
    {
        PanResponderNavigator: {
            screen: PanResponderNavigator
        },

        PanResponderExample: {
            screen: PanResponderExample
        },

        PanResponderExample1: {
            screen: PanResponderExample1
        },

        PanResponderExample2: {
            screen: PanResponderExample2
        },



    },
    {
        initialRouteName: 'PanResponderNavigator',
        onTransitionStart: (obj) => {
            console.log('onTransitionStart');
            console.log(obj);
        },
        onTransitionEnd: (obj) => {
            console.log('onTransitionEnd');
            console.log(obj);
        }
    }
);


export default AnimationNavigator;

// export default AnimationNavigatorPage;


