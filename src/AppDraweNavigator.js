import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';


///手风琴
import AccordionComponentNavigator from './AccordionComponent/AccordionComponentNavigator';

//对话框组件
import DialogsComponentNavigator from './DialogComponent/DialogsComponentNavigator';

//2019-01-24
import ReactNativeSpinkitNavigator from './react-native-spinkit/ReactNativeSpinkitNavigator';


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

        AccordionComponentNavigator: {
            screen: AccordionComponentNavigator,
            navigationOptions:{
                drawerLabel: '手风琴',
            }
        },

        //DialogsComponentNavigator
        DialogsComponentNavigator: {
            screen: DialogsComponentNavigator,
            navigationOptions:{
                drawerLabel: '对话框',
            }
        },
        ReactNativeSpinkitNavigator: {
            screen: ReactNativeSpinkitNavigator,
            navigationOptions:{
                drawerLabel: 'react-native-spinkit加载层组件',
            }
        },



    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


