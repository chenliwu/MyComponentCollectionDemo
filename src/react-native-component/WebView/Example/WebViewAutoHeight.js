import React, {Component} from 'react';
import {
    Text,
    WebView,
    ScrollView,
    PixelRatio,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';

let thisWebView = null;

export default class WebViewAutoHeight extends Component {


    constructor(props) {
        super(props);
        this.state = {
            defWebViewHeight: 0,
        }
    }

    pxToDp(px) {
        return px;
    }

    _onLoadEnd() {
        const script = `window.postMessage(document.body.scrollHeight)`;
        thisWebView && thisWebView.injectJavaScript(script);
    }

    _onMessage(e) {
        let valToInt = parseInt(e.nativeEvent.data);
        let defWebViewHeight = this.pxToDp(valToInt);
        if (defWebViewHeight != this.state.defWebViewHeight){
            //动态改变WebView组件的高度
            this.setState({defWebViewHeight});
        }
    }

    /**
     * 注入html代码让h5调用
     * @returns {string}
     * @private
     */
    _getInjectedJavaScript() {
        const patchPostMessageFunction = () => {
            let originalPostMessage = window.postMessage;
            let patchedPostMessage = (message, targetOrigin, transfer) => {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = () => {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;
        };
        return '(' + String(patchPostMessageFunction) + ')();';
    }

    /**
     * 绘制加载视图
     * @returns {*}
     */
    renderLoadingView() {
        if (this.state.defWebViewHeight == 0) {
            return (
                <View style={{alignItems: "center"}}>
                    <ActivityIndicator
                        animating={true}
                        style={{height: 80, width: 80,}}
                        size="large"
                    />
                </View>
            )
        }
    }

    renderAutoHeightWebView() {
        return (
            <View style={{height: this.state.defWebViewHeight,}}>
                <WebView
                    ref={webview => thisWebView = webview}
                    injectedJavaScript={this._getInjectedJavaScript()}
                    onLoadEnd={this._onLoadEnd}
                    onMessage={this._onMessage.bind(this)}
                    scrollEnabled={false}
                    {...this.props}
                />
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                {this.renderLoadingView()}
                {this.renderAutoHeightWebView()}
            </ScrollView>
        );
    }
}
