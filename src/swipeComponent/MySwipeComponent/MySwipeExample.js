import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

import MySwipeRow from './MySwipeRow';

export default class MySwipeExample extends Component {

    static navigationOptions = {
        headerTitle: '自定义侧滑组件',
    };

    MySwipeRow = null;

    constructor(props) {
        super(props);
        const dataList = [
            {id: 'beijing', name: '北京'},
            {id: 'shanghai', name: '上海'},
            {id: 'guangzhou', name: '广州'},
            {id: 'shenzhen', name: '深圳'},
        ];
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
            <MySwipeRow key={'swipe1'} ref={(ref) => {
                this.MySwipeRow = ref;
            }} style={{marginTop: 200}}>
                {/*绝对在底部的view*/}
                <TouchableOpacity
                    style={styles.delTextContainer}
                    onPress={() => {
                        this.MySwipeRow && this.MySwipeRow._closeSwipeRow();
                        alert('ss');
                    }}
                >
                    <Text style={styles.deleteTextStyle}>删除</Text>
                </TouchableOpacity>
                {/*内容content*/}
                <TouchableWithoutFeedback
                    onPress={()=>{
                        this.MySwipeRow && this.MySwipeRow._closeSwipeRow();
                    }}>
                    <View style={styles.content}>
                        <Text>item.name</Text>
                    </View>
                </TouchableWithoutFeedback>
            </MySwipeRow>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref={(flatList) => {
                        //获取FlatList组件的引用
                        this.flatListComponent = flatList;
                    }}
                    data={this.state.dataList}

                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#ddd',}}/>}
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


                <Button title={'关闭Swipe'} onPress={() => {
                    console.log(this.MySwipeRow);
                    this.MySwipeRow && this.MySwipeRow._closeSwipeRow();
                }}/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
    },
    delTextContainer: {
        width: 75,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteTextStyle: {
        color: '#fff',
    },
    content: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
// ---------------------
//     作者：vv_小虫
// 来源：CSDN
// 原文：https://blog.csdn.net/vv_bug/article/details/79536156
//     版权声明：本文为博主原创文章，转载请附上博文链接！