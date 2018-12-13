import React from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Dimensions,
    LayoutAnimation
} from 'react-native';

import MySpringAnimation from './MySpringAnimation';

/**
 * 2018-12-13
 * chenlw
 * work：  LayoutAnimation API学习
 */
export default class AnimatedExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        // console.log(navigation);
        // console.log(navigationOptions);
        // const headerTitle = navigation.getParam('headerTitle',"");

        return ({
            headerTitle: 'AnimatedExample'
        });

    };

    constructor(props) {
        super(props);
        this.state = {
            springAnimationVisible: false,
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor:'#fff'
            }}>
                <Button title={'弹跳动画'} onPress={() => {
                    this.setState({
                        springAnimationVisible: !this.state.springAnimationVisible,
                    });
                }}/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {
                        this.state.springAnimationVisible ?
                            <MySpringAnimation width={200} height={200}/> : null
                    }

                </View>
            </View>
        )
    }


}
