import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

//Toast组件
import ToastNavigator from './Toast/ToastNavigator';

//Animation动画 2018-12-13
import AnimationNavigator from './Animation/AnimationNavigator';


//动画 2018-12-10

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

        ToastNavigator: {
            screen: ToastNavigator,
            navigationOptions:{
                drawerLabel: 'Toast提示',
            }
        },

        AnimationNavigator: {
            screen: AnimationNavigator,
            navigationOptions:{
                drawerLabel: '动画相关',
            }
        },


    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


