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

import WebViewExample from './WebView/WebViewExample';
import WebViewExample1 from './WebView/WebViewExample1';
import WebViewLoadingExample from './WebView/WebViewLoadingExample';
import WebViewLoadingExample1 from './WebView/WebViewLoadingExample1';
import WebViewLoadingExample2 from './WebView/WebViewLoadingExample2';


class WebViewNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'ScrollViewExample组件练习',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'WebViewExample',
            name: 'WebViewExample组件练习'
        });

        dataList.push({
            id: 'WebViewExample1',
            name: 'WebViewExample组件练习1'
        });

        dataList.push({
            id: 'WebViewLoadingExample',
            name: 'WebView加载条Demo'
        });

        dataList.push({
            id: 'WebViewLoadingExample1',
            name: 'WebView加载条Demo1'
        });

        dataList.push({
            id: 'WebViewLoadingExample2',
            name: 'WebView ProgressBar加载条'
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
        WebViewExample: {
            screen: WebViewExample
        },

        WebViewExample1: {
            screen: WebViewExample1
        },

        WebViewLoadingExample: {
            screen: WebViewLoadingExample
        },
        WebViewLoadingExample1: {
            screen: WebViewLoadingExample1
        },
        WebViewLoadingExample2: {
            screen: WebViewLoadingExample2
        },


    },
    {
        initialRouteName: 'WebViewNavigatorPage',
        //headerMode: 'center'
    }
);

export default WebViewNavigator;

