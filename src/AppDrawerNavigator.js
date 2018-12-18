import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';


//Animation动画 2018-12-13
import AnimationNavigator from './Animation/AnimationNavigator';


//布局动画 2018-12-18
import LayoutAnimationNavigator from './LayoutAnimation/LayoutAnimationNavigator';


//手势操作 2018-12-15
import PanResponderNavigator from './PanResponder/PanResponderNavigator';

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


    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


