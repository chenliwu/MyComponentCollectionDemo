import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';


//Animation动画 2018-12-13
import AnimationNavigator from './Animation/AnimationNavigator';
import AnimationStudyNavigator from './AnimationStudy/AnimationStudyNavigator';


//布局动画 2018-12-18
import LayoutAnimationNavigator from './LayoutAnimation/LayoutAnimationNavigator';


//手势操作 2018-12-15
import PanResponderNavigator from './PanResponder/PanResponderNavigator';


//ScrollView  PanResponder 2018-12-19
import ScrollViewPanResponderNavigator from './ScrollViewRanResponder/ScrollViewPanResponderNavigator';

//ScrollView 滑动动画
import ScrollViewSwipeAnimationExample from './ScrollViewSwipeAnimation/ScrollViewSwipeAnimationExample';


import RNTesterNavigator from './RNTester/RNTesterNavigator';


import {
    SafeAreaView,
    createDrawerNavigator
} from 'react-navigation';


class AppNavigatorPage extends Component {

    static navigationOptions = {
        headerTitle: 'AppNavigatorPage'
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>组件收集</Text>
                <Text>2018-12-05</Text>
                <Text>chenlw</Text>
                <Text>右滑打开抽屉</Text>
                <Button title="打开抽屉" onPress={()=>{
                    this.props.navigation.openDrawer();
                }} />
            </SafeAreaView>
        );
    }

}

export default createDrawerNavigator(
    {
        AppNavigatorPage: {
            screen: AppNavigatorPage,
            navigationOptions:{
                drawerLabel: "首页",
            }
        },

        AnimationNavigator: {
            screen: AnimationNavigator,
            navigationOptions:{
                drawerLabel: '动画相关',
            }
        },

        AnimationStudyNavigator: {
            screen: AnimationStudyNavigator,
            navigationOptions:{
                drawerLabel: 'Animated动画学习',
            }
        },

        LayoutAnimationNavigator: {
            screen: LayoutAnimationNavigator,
            navigationOptions:{
                drawerLabel: '布局动画',
            }
        },

        PanResponderNavigator: {
            screen: PanResponderNavigator,
            navigationOptions:{
                drawerLabel: '手势操作',
            }
        },

        ScrollViewPanResponderNavigator: {
            screen: ScrollViewPanResponderNavigator,
            navigationOptions:{
                drawerLabel: 'ScrollView手势操作',
            }
        },

        ScrollViewSwipeAnimationExample: {
            screen: ScrollViewSwipeAnimationExample,
            navigationOptions:{
                drawerLabel: 'ScrollView滑动动画',
            }
        },


        RNTesterNavigator: {
            screen: RNTesterNavigator,
            navigationOptions:{
                drawerLabel: 'React-Native官方动画源码',
            }
        },


    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


