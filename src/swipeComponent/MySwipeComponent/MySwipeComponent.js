import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class MySwipeComponent extends Component {

    static navigationOptions = {
        headerTitle: '自定义侧滑组件',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.swipeContainer}>
                    {/*绝对在底部的view*/}
                    <View style={styles.swipeActions}>
                        <TouchableOpacity
                            style={styles.delTextContainer}
                            onPress={() => {
                                alert('ss');
                            }}
                        >
                            <Text style={styles.deleteTextStyle}>删除</Text>
                        </TouchableOpacity>
                    </View>
                    {/*
                        内容content
                        侧滑组件的实现思路：
                        （1）我们只需要给一个手势在move的时候动态的设置左偏移量，然后手指松开的时候做一些逻辑判断，最后给一个动画，就可以简单的实现我们的侧滑删除功能了。
                    */
                    }
                    <View style={[styles.content, {transform: [{translateX: -100}]}]}>
                        <Text>我是item的内容</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    swipeContainer: {   //侧滑组件容器的样式
        width: '100%',
        marginTop: 100,
        height: 100,
    },
    swipeActions: { //侧滑删除组件的样式
        backgroundColor: 'grey',
        width: '100%',
        overflow: 'hidden',
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    delTextContainer: { //删除按钮的容器
        width: 100,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteTextStyle: {  //
        color: '#fff',
    },
    content: {
        width: '100%',
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
// ---------------------
//     作者：vv_小虫
// 来源：CSDN
// 原文：https://blog.csdn.net/vv_bug/article/details/79536156
//     版权声明：本文为博主原创文章，转载请附上博文链接！