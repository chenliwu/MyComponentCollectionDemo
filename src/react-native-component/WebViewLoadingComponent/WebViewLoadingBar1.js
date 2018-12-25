import React, {Component} from 'react';

import {
    View,
    Animated,
    Easing
} from 'react-native';

/**
 * 2018-12-21
 * chenlw
 * work：编写WebView加载条组件
 */
export default class WebViewLoadingBar1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingBarWidth: new Animated.Value(0),
        };
    }

    componentDidMount() {
        const width = new Animated.Value(this.props.width);
        this.setState({
            loadingBarWidth: width,
        });
        Animated.timing(new Animated.Value(0), {
            toValue: width,
            duration: 2000,
            easing: Easing.linear,// 线性的渐变函数
            useNativeDriver: true,
        }).start();
    }


    render() {
        const loadingBarColor = this.props.color ? this.props.color : 'green';

        return (
            <Animated.View style={{
                flex: 1,
                width: this.props.width,
                height: 3,
                backgroundColor: loadingBarColor
            }}>
            </Animated.View>
        );
    }

}