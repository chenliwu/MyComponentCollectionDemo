import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

import AppDrawerNavigator from './AppDrawerNavigator';


//动画 2018-12-10
import ScrollViewExample1 from './Animation/ScrollViewAnimation/ScrollViewExample1';

import {
    SafeAreaView,
    createStackNavigator
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
                <Button title="打开抽屉" onPress={() => {
                    this.props.navigation.openDrawer();
                }}/>
            </SafeAreaView>
        );
    }

}

export default createStackNavigator(
    {
        AppDrawerNavigator: {
            screen: AppDrawerNavigator,
            navigationOptions: {
                drawerLabel: "首页",
            }
        },

        ///动画相关
        // ScrollViewExample1: {
        //     screen: ScrollViewExample1,
        // }


    },
    {
        initialRouteName: 'AppDrawerNavigator',
        //headerMode: 'center'
    }
);


