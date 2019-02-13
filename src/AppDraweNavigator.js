import React, {Component} from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';



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



    },
    {
        initialRouteName: 'AppNavigatorPage',
        //headerMode: 'center'
    }
);


