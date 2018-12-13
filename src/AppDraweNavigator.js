import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

///滑动删除组件 2018-12-5
import SwipeComponentNavigator from './swipeComponent/SwipeComponentNavigator';

//Toast组件
import ToastNavigator from './Toast/ToastNavigator';

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
        SwipeComponentNavigator: {
            screen: SwipeComponentNavigator,
            navigationOptions:{
                drawerLabel: '侧滑组件',
            }
        },

        ToastNavigator: {
            screen: ToastNavigator,
            navigationOptions:{
                drawerLabel: 'Toast提示',
            }
        },

    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


