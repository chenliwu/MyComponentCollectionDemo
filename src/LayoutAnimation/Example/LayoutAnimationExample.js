import React from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

import MyLayoutAnimation from './MyLayoutAnimation';

/**
 * 2018-12-13
 * chenlw
 * work：  MyLayoutAnimation API学习
 */
export default class LayoutAnimationExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        // console.log(navigation);
        // console.log(navigationOptions);
        // const headerTitle = navigation.getParam('headerTitle',"");

        return ({
            headerTitle: '布局动画',
            //禁止打开菜单
            drawerLockMode: "locked-closed",
            //允许使用返回手势
            gesturesEnabled: true,
        });

    };

    constructor(props) {
        super(props);
        this.state = {
            layoutAnimationVisible: false,
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button title={'布局动画测试'} onPress={() => {
                    this.setState({
                        layoutAnimationVisible: !this.state.layoutAnimationVisible,
                    });
                }}/>
                {
                    this.state.layoutAnimationVisible ?
                        <MyLayoutAnimation width={100} height={100}></MyLayoutAnimation> : null
                }

            </View>
        )
    }


}
