import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    SwipeableFlatList,//侧滑列表
} from 'react-native';


export default class FlatListDemo extends Component<Props> {
    static navigationOptions = {
        title: 'SwipeableFlatList',
    };


    SwipeableFlatList = null;


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
     * 绘制侧滑菜单
     * @returns {*}
     */
    getQuickActions = ({item, index}) => {
        return (
            <View style={styles.quickAContent}>
                <TouchableHighlight
                    onPress={() => {
                        console.log('click item');
                        console.log(item);
                        this.SwipeableFlatList.setState({
                            openRowKey: null,   //关闭侧滑菜单
                        });
                        let dataList = this.state.dataList;
                        const list = dataList.filter(i => i.id !== item.id);
                        this.setState({
                            dataList: list
                        });

                    }}
                >
                    <View style={styles.quick}>
                        <Text style={styles.delete}>删除</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };


    keyExtractor = (item: any, index: number) => {
        return index.toString();
    };

    renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback key={item.id} onPress={() => {
                console.log(this.SwipeableFlatList);
                console.log(item);
                //state.openRowKey 标识哪一行打开了侧滑菜单;值为null则表示没有行打开侧滑菜单
                this.SwipeableFlatList.setState({
                    openRowKey: null,   //关闭侧滑菜单
                });

            }}>
                <View style={styles.item}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };


    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    ref={(ref) => {
                        this.SwipeableFlatList = ref;
                    }}

                    ItemSeparatorComponent={() => <View
                        style={{height: 1, backgroundColor: '#ddd',}}/>}

                    //1数据的获取和渲染
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}

                    //2创建侧滑菜单
                    renderQuickActions={this.getQuickActions}//创建侧滑菜单
                    maxSwipeDistance={75}   //可展开（滑动）的距离
                    bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#fff',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,//漂浮的效果
        //borderRadius:5,//圆角
    },
    text: {
        color: '#444444',
        fontSize: 20,
    },
    //侧滑菜单的样式
    quickAContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    quick: {
        backgroundColor: "#ff1d49",
        flex: 1,
        alignItems: 'center',//水平靠右
        justifyContent: 'center',//上下居中
        width: 75,
        //borderRadius:5,
        //elevation:5,//漂浮的效果

    },
    delete: {
        color: "#fff",
        fontSize: 16,
        //marginRight:30
    }
});
// ---------------------
//     作者：蓝莓味的鱼
// 来源：CSDN
// 原文：https://blog.csdn.net/yu_m_k/article/details/80580250
//     版权声明：本文为博主原创文章，转载请附上博文链接！