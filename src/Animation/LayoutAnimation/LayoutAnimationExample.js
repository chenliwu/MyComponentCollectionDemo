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

import MyAnimation from './MyAnimation';

/**
 * 2018-12-13
 * chenlw
 * work：  LayoutAnimation API学习
 */
export default class LayoutAnimationExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        // console.log(navigation);
        // console.log(navigationOptions);
        // const headerTitle = navigation.getParam('headerTitle',"");

        return ({
            headerTitle: 'LayoutAnimation'
        });

    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MyAnimation width={100} height={100} ></MyAnimation>
            </View>
        )
    }


}
