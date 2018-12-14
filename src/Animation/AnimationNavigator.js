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

import ScrollViewExample from './ScrollViewAnimation/ScrollViewExample';
import ScrollViewExample1 from './ScrollViewAnimation/ScrollViewExample1';


import LayoutAnimationExample from './LayoutAnimation/LayoutAnimationExample';
import AnimatedExample from './Animated/AnimatedExample';


class AnimationNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'ScrollViewExample组件练习',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'ScrollViewExample',
            name: 'ScrollViewExample组件练习'
        });
        dataList.push({
            id: 'ScrollViewExample1',
            name: 'ScrollViewExample组件练习1'
        });


        dataList.push({
            id: 'LayoutAnimationExample',
            name: 'LayoutAnimation动画'
        });

        dataList.push({
            id: 'AnimatedExample',
            name: 'Animated简单动画'
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
                backgroundColor:'#fff'
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
        AnimationNavigator: {
            screen: AnimationNavigatorPage
        },

        ScrollViewExample: {
            screen: ScrollViewExample
        },
        ScrollViewExample1: {
            screen: ScrollViewExample1
        },

        LayoutAnimationExample: {
            screen: LayoutAnimationExample
        },


        AnimatedExample: {
            screen: AnimatedExample
        },
    },
    {
        initialRouteName: 'AnimationNavigator',
        //headerMode: 'center'
    }
);

AnimationNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }

    return {
        drawerLockMode,
    };
};

export default AnimationNavigator;

// export default AnimationNavigatorPage;


