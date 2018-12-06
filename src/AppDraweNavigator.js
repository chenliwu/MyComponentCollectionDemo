import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

///滑动删除组件
import SwipeComponentNavigator from './swipeComponent/SwipeComponentNavigator';

///手风琴
import AccordionComponentNavigator from './AccordionComponent/AccordionComponentNavigator';

//对话框组件
import DialogsComponentNavigator from './DialogComponent/DialogsComponentNavigator';

//Toast组件
import ToastNavigator from './Toast/ToastNavigator';

//Modal模态框
import ModalComponentNavigator from './ModalComponent/ModalComponentNavigator';



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

        ToastNavigator: {
            screen: ToastNavigator,
            navigationOptions:{
                drawerLabel: 'Toast提示',
            }
        },

        ModalComponentNavigator: {
            screen: ModalComponentNavigator,
            navigationOptions:{
                drawerLabel: 'Modal模态框',
            }
        },
    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


