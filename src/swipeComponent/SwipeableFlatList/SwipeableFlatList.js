import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    SwipeableFlatList,//侧滑列表
} from 'react-native';


const CITY_NAMES = ['北京', '上海', '广州', '杭州', '苏州'];

export default class FlatListDemo extends Component<Props> {
    static navigationOptions = {
        title: 'SwipeableFlatList',
    };


    SwipeableFlatList = null;

    //侧滑菜单渲染
    getQuickActions = () => {
        return <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={() => alert("确认删除？")}
            >
                <View style={styles.quick}>
                    <Text style={styles.delete}>删除</Text>
                </View>
            </TouchableHighlight>
        </View>
    };


    renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                console.log(this.SwipeableFlatList);
                console.log(item);
                //state.openRowKey 标识哪一行打开了侧滑菜单;值为null则表示没有行打开侧滑菜单
                this.SwipeableFlatList.setState({
                    openRowKey: null
                })

            }}>
                <View style={styles.item}>
                    <Text style={styles.text}>{item}</Text>
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
                    //1数据的获取和渲染
                    bounceFirstRowOnMount={false}
                    data={CITY_NAMES}
                    renderItem={this.renderItem}

                    //2创建侧滑菜单
                    renderQuickActions={() => this.getQuickActions()}//创建侧滑菜单
                    maxSwipeDistance={75}//可展开（滑动）的距离
                    // bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
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
        // marginRight: 15,
        // marginLeft: 15,
        //marginBottom: 10,
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
        //marginRight:15,
        //marginBottom:10,
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
        color: "#d8fffa",
        //marginRight:30
    }
});
// ---------------------
//     作者：蓝莓味的鱼
// 来源：CSDN
// 原文：https://blog.csdn.net/yu_m_k/article/details/80580250
//     版权声明：本文为博主原创文章，转载请附上博文链接！