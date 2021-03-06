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


import ReactNativeModalExample from './react-native-modal/Example';
import MyLoadingModal from './react-native-modal/MyLoadingModal';



class ModalComponentNavigator extends React.Component {

    static navigationOptions = {
        headerTitle: 'Modal模态框',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'ReactNativeModalExample',
            name: 'react-native-modal使用demo'
        });

        dataList.push({
            id: 'MyLoadingModal',
            name: 'react-native-modal加载模态框'
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


export default createStackNavigator(
    {
        ModalComponentNavigator: {
            screen: ModalComponentNavigator
        },
        ReactNativeModalExample:{
            screen:ReactNativeModalExample
        },
        MyLoadingModal:{
            screen:MyLoadingModal
        }
    },
    {
        initialRouteName: 'ModalComponentNavigator',
        //headerMode: 'center'
    }
);


