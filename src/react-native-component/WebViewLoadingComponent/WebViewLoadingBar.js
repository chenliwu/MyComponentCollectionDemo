import React, {Component} from 'react';

import {
    View,
    Animated,
    LayoutAnimation,
    Dimensions
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

export default class WebViewLoadingBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingBarWidth: 0,
        };
    }


    componentDidMount() {
        this.timer = setInterval(
            () => {

                if (this.state.loadingBarWidth < ScreenWidth) {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                    this.setState({
                        loadingBarWidth: this.state.loadingBarWidth + ScreenWidth / 2.5,
                    });
                }

            },
            500
        );
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        console.log('componentWillUnmount');
    }

    render() {
        const loadingBarWidth = this.state.loadingBarWidth;
        const loadingBarColor = this.props.color ? this.props.color : 'green';
        return (
            <View style={{
                flex: 1,
                width: loadingBarWidth,
                height: 3,
                backgroundColor: loadingBarColor
            }}>
            </View>
        );
    }

}