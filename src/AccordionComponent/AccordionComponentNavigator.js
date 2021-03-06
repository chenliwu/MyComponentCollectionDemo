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

import NativeBaseCustomAccordionExample from './native-base/CustomAccordionExample';
import ConditionPage from './native-base/conditionDemo/ConditionPage';

class AccordionNavigatorPage extends React.Component{

    static navigationOptions = {
        headerTitle: '手风琴',
    };

    flatListComponent = null;

    constructor(props) {
        super(props);
        let dataList = new Array();

        dataList.push({
            id: 'NativeBaseCustomAccordionExample',
            name: 'native-base手风琴'
        });
        dataList.push({
            id: 'ConditionPage',
            name: '筛选条件运用手风琴'
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
                    //backgroundColor: 'red'
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
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    ItemSeparatorComponent={() => <View
                        style={{ height: 1, backgroundColor: '#f5f5f9', }} />}
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
        AccordionNavigatorPage:{
            screen:AccordionNavigatorPage
        },
        NativeBaseCustomAccordionExample: {
            screen: NativeBaseCustomAccordionExample
        },
        ConditionPage:{
            screen:ConditionPage
        },
    },
    {
        initialRouteName: 'AccordionNavigatorPage',
        //headerMode: 'center'
    }
);


