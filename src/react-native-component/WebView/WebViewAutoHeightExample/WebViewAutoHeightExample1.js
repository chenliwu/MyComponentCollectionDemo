import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    WebView,
    ActivityIndicator,
    ScrollView, Platform
} from 'react-native';
import SceneView from "react-navigation/src/views/SceneView";

const {width, height} = Dimensions.get('window');

const HTML = `  
<!DOCTYPEhtml>\n  
<html>  
  <head>  
    <title>HTML字符串</title>  
    <meta http-equivmetahttp-equiv="content-type" content="text/html;charset=utf-8">  
    <meta name="viewport"content="width=320, user-scalable=no">  
    <style type="text/css">  
      body {  
        /*height:100%,*/
        /*margin: 0;  */
        /*padding: 0;  */
        /*font: 40% arial, sans-serif;  */
        /*background: #FFF;  */
        /*padding: 10px;*/
      }  
    </style>
  </head>  
  <body>  
    <div>
        <button onclick="showHeightInfo()" >显示高度数据</button>
        <button onclick="setHeight1()" >设置高度为window.screen.availHeight</button>
        <button onclick="setHeight2()" >设置高度为window.innerHeight</button>
        <button onclick="setHeight3()" >设置高度为document.body.scrollHeight</button>
        <button onclick="setHeight4()" >设置高度为document.documentElement.clientHeight</button>
    </div>
    
    <p><br>红缨子高粱，俗称小红梁，是赤水河流域特产的一种有机糯高粱。它是茅台镇酱香型白酒的关键酿酒原料。因不同于其他高粱，粒小、皮厚、坚实、饱满，红缨子高粱被形象称为“沙”。<br><br><br><img src="https://zn-image.oss-cn-shenzhen.aliyuncs.com/supplychain-dev/test/articleEdit/PhbM5hiSHF.jpg" style="max-width:100%;"><br>茅台酒所代表的酱香酒，有三个独特工艺特点，都与红缨子高粱有关。<br><br><br>第一， 茅台酒两次投料，其他白酒一年四季都在投料，两次投料即指红缨子高粱，谓之“下沙”。<br><br>第二， 茅台酒生产周期历时一年，七次精酿，只有红缨子高粱才能历经九次蒸煮，谓之“回沙”。<br><br>第三，茅台酒是整粒高粱参与发酵，约20%破碎率，此类传统工艺的酱香酒，谓之“坤沙”（整粒之意）。<br><br>红缨子高粱单宁含量约1.61%，总淀粉含量65%以上，支链淀粉含量占总淀粉含量的88%~93%。<br><img src="https://zn-image.oss-cn-shenzhen.aliyuncs.com/supplychain-dev/test/articleEdit/PkAb7NiBfH.jpg" style="max-width:100%;"><br>红缨子高粱支链淀粉含量高，其截面呈玻璃质地状，十分有利于回沙工艺的多轮次翻烤，使茅台镇酱香型白酒每一轮的营养消耗有一合理范围。支链淀粉(amylopection)又称胶淀粉,分子相对较大,一般由几千个葡萄糖残基组成。支链淀粉加热糊化后，分子中的链较为松散，因此具有较高的粘度。<br><br>红缨子高粱单宁含量适中（1.5%-2.0%），通过传统酱香工艺发酵形成茅台酒特有的芳香类风味物质。这些物质的形成与当地高粱原料及特殊的地域微生物群系密切相关。也是茅台酒幽雅细腻、回味悠长的重要因素。<br>至于为何要两次投料，季克良曾解释说：是顺应了自然条件设计出来的，因为贵州是山区，山上的粮食要迟一点成熟，山下的粮食，河谷地带的要早成熟，所以早成熟的部分我们先投下去，然后山上成熟了第二次投料。<br><img src="https://zn-image.oss-cn-shenzhen.aliyuncs.com/supplychain-dev/test/articleEdit/s42CrmRRfP.jpg" style="max-width:100%;"><br>红缨子高粱有着独特的“谦卑”气质，相对其他高粱的“牛气冲天”，它总是保持微微弯腰低头，像儒家文化的谦谦君子。厚德载物，方为君子，一瓶茅台酒历时一年生产、七次精酿、三年贮存、五年出厂。这五年的坚守，如果换算成工作时间，足足有一万小时，这恰似人生的奋斗历程。茅台酒见证了历史的重要时刻，也见证着人生的重要时刻。茅台酒伴随着百年民族复兴，茅台酒也伴随着人生的涅槃成长。<br><br>红缨子高粱所带来的独特气质，造就了茅台酒的独特气质。当我们打开一瓶茅台酒，如兰花之香，香而不艳，幽雅细腻。茅台酒决无添加，却富含1000种香味香气物质，是世界上香味香气物质最为丰富丰满的酒品之一。闻香丰富、口感丰满、回味悠长、留香持久，构成了茅台酒独特的产品</p> 
  </body>  
  
  <script>
  
    function showHeightInfo(){
        let message = "";
         message+='窗口高度='+window.screen.availHeight+"\\n";
         message+='window.innerHeight ='+window.innerHeight +"\\n";
         message+='document.documentElement.clientHeight ='+document.documentElement.clientHeight +"\\n";
         
         message+='document.body.scrollHeight ='+document.body.scrollHeight +"\\n";
         message+='document.body.clientHeight='+document.body.clientHeight+"\\n";
         if(window.postMessage) {
                window.postMessage(JSON.stringify({type: 'test',height: 500,message:message}));
         }
    }
    
    function setHeight1() {
      if(window.postMessage) {
            window.postMessage(JSON.stringify({type: 'setHeight',height: window.screen.availHeight}));
       }
    } 
    
    function setHeight2() {
      if(window.postMessage) {
            window.postMessage(JSON.stringify({type: 'setHeight',height: window.innerHeight}));
       }
    }
    
    function setHeight3() {
      if(window.postMessage) {
            window.postMessage(JSON.stringify({type: 'setHeight',height: document.body.scrollHeight}));
       }
    }
    
    function setHeight4() {
      if(window.postMessage) {
            window.postMessage(JSON.stringify({type: 'setHeight',height: document.documentElement.clientHeight}));
       }
    }
  

  </script>
  
</html>  
`;


//模块声名并导出
export default class WebViewAutoHeightExample1 extends React.Component {

    static navigationOptions = {
        headerTitle: '测试webView适配高度'
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {height: 200};
    }

    _handleMessage(event) {
        try {
            const objData = JSON.parse(event.nativeEvent.data);
            switch (objData.type) {
                case 'test':    //测试html与rn的交互
                    alert(objData.message);
                    break;

                case 'setHeight':
                    //当HTML高度发生变化时，动态设置WebView高度
                    console.log('setHeight');
                    console.log(objData);
                    if (objData.height > 0) {
                        this.setState({height: objData.height})
                    }
                    break;
            }
        } catch (error) {
        }
    }

    /**
     * SceneView里面嵌套WebView组件，WebView组件不允许滑动，需要动态设置WebView的高度为HTML内容的高度
     * @returns {*}
     */
    render() {
        let webViewSource;
        if (Platform.OS === 'android') {
            webViewSource = {
                html: HTML,
                baseUrl: ''      //即使没有baseUrl，也要加上这个属性，写上空串，解决android加载页面乱码的问题
            }
        } else if (Platform.OS === 'ios') {
            webViewSource = {
                html: HTML,
                //baseUrl:''      //IOS不要加这个属性，会导致HTML加载不出来
            }
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <Text>屏幕高度：{Dimensions.get('window').height}</Text>
                    <Text>WebView高度：{this.state.height}</Text>
                    <WebView
                        style={{flex: 1, height: this.state.height}}
                        // source={{
                        //     html: HTML,
                        //     baseUrl:''      //即使没有baseUrl，也要加上这个属性，写上空串，解决android加载页面乱码的问题
                        // }}
                        source={webViewSource}
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
                        domStorageEnabled={true}
                        scrollEnabled={false}
                        javaScriptEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        onMessage={(e) => {
                            this._handleMessage(e)
                        }}
                        // 初始化webview注入全局代码
                        injectedJavaScript={BaseScript}
                    />

                </ScrollView>

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