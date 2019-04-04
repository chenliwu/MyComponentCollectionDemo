import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator
} from 'react-navigation';

import WebViewAutoHeightExample from './WebViewAutoHeightExample/WebViewAutoHeightExample';
import WebViewAutoHeightExample1 from './WebViewAutoHeightExample/WebViewAutoHeightExample1';

//2019-04-03  WebView组件与React-Native通信机制实践
import WebViewCommunicationExample from './WebViewCommunicationExample/WebViewCommunicationExample';


class WebViewNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'WebView组件练习',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'WebViewAutoHeightExample',
            name: 'WebView自适应高度组件练习'
        });

        dataList.push({
            id: 'WebViewAutoHeightExample1',
            name: 'WebView自适应高度组件练习1'
        });

        dataList.push({
            id: 'WebViewCommunicationExample',
            name: 'WebView组件与React-Native通信机制实践'
        });

        this.state = {
            dataList: dataList
        };
    }

    /**
     * item点击事件
     * @param item
     * @private
     */
    _onPressItem = (item) => {
        this.props.navigation.navigate(item.id);
    };

    /**
     * 渲染item组件（数据行）
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    this._onPressItem(item);
                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>

        )
    };


    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor:'#fff'
            }}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    ItemSeparatorComponent={() => <View
                        style={{height: 1, backgroundColor: '#f5f5f9',}}/>}
                    data={this.state.dataList}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={({item, index}) => {
                        return this._renderItem({item, index});
                    }}

                    getItemLayout={(item, index) => (
                        {length: 50, offset: (50 + 2) * index, index}
                    )}

                />
            </SafeAreaView>
        );
    }
}


const WebViewNavigator = createStackNavigator(
    {
        WebViewNavigatorPage: {
            screen: WebViewNavigatorPage
        },
        WebViewAutoHeightExample: {
            screen: WebViewAutoHeightExample
        },

        WebViewAutoHeightExample1: {
            screen: WebViewAutoHeightExample1
        },

        WebViewCommunicationExample: {
            screen: WebViewCommunicationExample
        },


    },
    {
        initialRouteName: 'WebViewNavigatorPage',
        //headerMode: 'center'
    }
);

export default WebViewNavigator;
