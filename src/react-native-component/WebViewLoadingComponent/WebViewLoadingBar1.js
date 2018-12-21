import React, {Component} from 'react';

import {
    View,
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
            loadingBarWidth: 0,
        };
    }


    render() {
        const loadingBarColor = this.props.color ? this.props.color : 'green';
        return (
            <View style={{
                flex: 1,
                width: this.props.width,
                height: 3,
                backgroundColor: loadingBarColor
            }}>
            </View>
        );
    }

}