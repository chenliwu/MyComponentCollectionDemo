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


import ProgressBarAndroidExample from './Example/ProgressBarAndroidExample';
import ProgressViewIOSExample from './Example/ProgressViewIOSExample';

import CustomProgressBarExample from './CustomProgressBar/CustomProgressBarExample';
import ReactNativeProgressExample from './react-native-progress/ReactNativeProgressExample';


class ProgressBarNavigatorPage extends React.Component {

    static navigationOptions = {
        headerTitle: 'ProgressBar加载条组件',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'ProgressBarAndroidExample',
            name: 'ProgressBarAndroidExample'
        });

        dataList.push({
            id: 'ProgressViewIOSExample',
            name: 'ProgressViewIOSExample'
        });

        dataList.push({
            id: 'CustomProgressBarExample',
            name: '自定义进度条组件'
        });

        dataList.push({
            id: 'ReactNativeProgressExample',
            name: 'react-native-progress库加载条'
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
                backgroundColor: '#fff'
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


const ProgressBarNavigator = createStackNavigator(
    {
        ProgressBarNavigatorPage: {
            screen: ProgressBarNavigatorPage
        },

        ProgressBarAndroidExample: {
            screen: ProgressBarAndroidExample
        },

        ProgressViewIOSExample: {
            screen: ProgressViewIOSExample
        },

        CustomProgressBarExample: {
            screen: CustomProgressBarExample
        },


        ReactNativeProgressExample: {
            screen: ReactNativeProgressExample
        },

    },
    {
        initialRouteName: 'ProgressBarNavigatorPage',
        //headerMode: 'center'
    }
);

export default ProgressBarNavigator;

