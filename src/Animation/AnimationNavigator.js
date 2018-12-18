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

import ScrollViewExample from './ScrollViewAnimation/ScrollViewExample';
import ScrollViewExample1 from './ScrollViewAnimation/ScrollViewExample1';
import ScrollViewExample2 from './ScrollViewAnimation/ScrollViewExample2';
import ScrollViewExample3 from './ScrollViewAnimation/ScrollViewExample3';
import ScrollViewExample4 from './ScrollViewAnimation/ScrollViewExample4';


import AnimatedExample from './Animated/AnimatedExample';


import FadeInViewExample from './FadeInView/FadeInViewExample';


class AnimationNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: '动画相关',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'ScrollViewExample',
            name: 'ScrollView动画'
        });
        dataList.push({
            id: 'ScrollViewExample1',
            name: 'ScrollView动画1'
        });
        dataList.push({
            id: 'ScrollViewExample2',
            name: 'ScrollView动画2'
        });

        dataList.push({
            id: 'ScrollViewExample3',
            name: 'ScrollView滚动头部置顶'
        });
        dataList.push({
            id: 'ScrollViewExample4',
            name: 'ScrollView实现header渐变'
        });


        dataList.push({
            id: 'AnimatedExample',
            name: 'Animated简单动画'
        });

        dataList.push({
            id: 'FadeInViewExample',
            name: 'FadeInView动画'
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
        AnimationNavigator: {
            screen: AnimationNavigatorPage
        },

        ScrollViewExample: {
            screen: ScrollViewExample
        },
        ScrollViewExample1: {
            screen: ScrollViewExample1
        },
        ScrollViewExample2: {
            screen: ScrollViewExample2
        },
        ScrollViewExample3: {
            screen: ScrollViewExample3
        },
        ScrollViewExample4: {
            screen: ScrollViewExample4
        },


        AnimatedExample: {
            screen: AnimatedExample
        },

        FadeInViewExample: {
            screen: FadeInViewExample
        },
    },
    {
        initialRouteName: 'AnimationNavigator',
        navigationOptions: {
            // headerStyle: {
            //     height: 50,
            //     backgroundColor: 'pink'
            // }
        },
        //headerTransitionPreset:'uikit',
        onTransitionStart: (obj) => {
            console.log('onTransitionStart');
            console.log(obj);
        },
        onTransitionEnd: (obj) => {
            console.log('onTransitionEnd');
            console.log(obj);
        }
        // transitionConfig: () => ({
        //     transitionSpec: {
        //         duration: 300,
        //         easing: Easing.out(Easing.poly(4)),
        //         timing: Animated.timing,
        //     },
        //     screenInterpolator: sceneProps => {
        //         const { layout, position, scene } = sceneProps;
        //         const { index } = scene;
        //
        //         const height = layout.initHeight;
        //         const translateY = position.interpolate({
        //             inputRange: [index - 1, index, index + 1],
        //             outputRange: [height, 0, 0],
        //         });
        //
        //         const opacity = position.interpolate({
        //             inputRange: [index - 1, index - 0.99, index],
        //             outputRange: [0, 1, 1],
        //         });
        //
        //         return { opacity, transform: [{ translateY }] };
        //     },
        // }),
        //headerMode: 'center'
    }
);

AnimationNavigator.navigationOptions = ({navigation}) => {
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


