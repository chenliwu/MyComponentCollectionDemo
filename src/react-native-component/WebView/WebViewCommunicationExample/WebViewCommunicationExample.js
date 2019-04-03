import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, View, WebView} from 'react-native';

const {width, height} = Dimensions.get('window');

const HTML = `  
<!DOCTYPE html> 
<html lang="en">  
  <head>  
    <title>WebView组件与HTML页面通信机制实践</title>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>  
  <body>  
    <div>
        <button onclick="sendEventToReactNative()" >发送事件到React-Native端</button>
    </div>
    <p>React-Native WebView组件与HTML页面通信机制实践</p>
    <div id="showInfoElement"></div>
  </body>  
  
  <script>
  
    function sendEventToReactNative(){
        console.log('sendEventToReactNative');
        document.getElementById("showInfoElement").innerHTML = "发送事件到React-Native端";
        let params = {};
        params.type = 'eventName';  
        params.message = "这是HTML页面传递到React-Native端的参数值";
        if(window.postMessage) {
            
            setTimeout(function() {
                 window.postMessage(JSON.stringify({type: 'eventName',message:"这是HTML页面传递到React-Native端的参数值"}));
            },100);
            
        }
    }
  

  </script>
  
</html>  
`;

export default class WebViewCommunicationExample extends React.Component {

    static navigationOptions = {
        headerTitle: 'WebView组件与HTML页面通信机制实践'
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {height: 200};
    }

    /**
     * 在 webview 内部的网页中调用 window.postMessage 方法时可以触发此属性对应的函数（onMessage），从而实现网页和 RN 之间的数据交换。
     * 设置此属性的同时会在 webview 中注入一个 postMessage 的全局函数并覆盖可能已经存在的同名实现。
     *
     * 网页端的 window.postMessage 只发送一个参数 data，此参数封装在 RN 端的 event 对象中，即 event.nativeEvent.data。data 只能是一个字符串。
     *
     * @param event
     * @private
     */
    _handleMessage(event) {
        try {
            //将HTML页面传递过来的数据转化成JSON对象
            const objData = JSON.parse(event.nativeEvent.data);
            console.log('');
            console.log('_handleMessage');
            console.log(objData);
            switch (objData.type) {
                case 'eventName':    //测试html与rn的交互
                    alert(objData.message);
                    break;
            }
        } catch (error) {
            console.log('_handleMessage catch');
            console.log(error);
        }
    }

    /**
     * SceneView里面嵌套WebView组件，WebView组件不允许滑动，需要动态设置WebView的高度为HTML内容的高度
     * @returns {*}
     */
    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    style={{flex: 1, height: this.state.height}}
                    source={{
                        html: HTML,
                        baseUrl:''      //即使没有baseUrl，也要加上这个属性，写上空串，解决android加载页面乱码的问题
                    }}
                    ref={'webview_ref'}
                    dataDetectorTypes={'none'}
                    automaticallyAdjustContentInsets={false}
                    startInLoadingState={true}
                    renderLoading={() => {
                        return (<View
                            style={{
                                flex: 1,
                                height: 200,
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <ActivityIndicator color={"#000"}/>
                        </View>);
                    }}
                    allowFileAccessFromFileURLs={true}
                    domStorageEnabled={true}
                    scrollEnabled={false}
                    javaScriptEnabled={true}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    onMessage={(event) => {
                        this._handleMessage(event)
                    }}
                    // 初始化webview注入全局代码
                    injectedJavaScript={BaseScript}
                />
            </View>
        );
    }
};

const BaseScript =
    `
    window.BTAppBridge = {
        initAttachment:function(data){
            var obj = {};
            obj.type = 'attachment';
            try{
                obj.dataList = data?JSON.parse(data):[];
            }catch(e){
                obj.dataList = [];
            }
            setTimeout(function(){
                window.postMessage(JSON.stringify(obj));
            },200);
        }
    }
(function () {
    var height = null;
    function changeHeight() {
        h = document.body.scrollHeight;
        if (h != height) {
            height = h;
            if (window.postMessage) {
                window.postMessage(JSON.stringify({type: 'setHeight',height: height}));
            }
        }
    }
    setInterval(changeHeight, 500);
} ())
`;