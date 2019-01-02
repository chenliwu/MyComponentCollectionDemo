import React from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    SafeAreaView
} from 'react-navigation';

import MySpringAnimation from './MySpringAnimation';


const screenWidth = Dimensions.get('window').width;

/**
 * 2018-12-13
 * chenlw
 * work：  ScrollView组件API学习
 */
export default class ScrollViewExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        //console.log(navigation);
        //console.log(navigationOptions);
        const headerTitle = navigation.getParam('headerTitle', "");
        const headerVisibleFlag = navigation.getParam('headerVisibleFlag', 0);
        if (headerVisibleFlag === 2) {
            return ({
                headerStyle: {
                    //marginBottom: -50,
                },
                // header:<View width={screenWidth} height={50}
                //     style={{ height: 50, width: '100%', backgroundColor: 'red'}}></View>,
                header: null,
                headerLeft: null,
                headerTransparent: true,
                //禁止打开菜单
                drawerLockMode: "locked-closed",
                //允许使用返回手势
                gesturesEnabled: true,
            });

        }
        return ({
            // header:
            //     <View style={{
            //         flex: 1,
            //         backgroundColor: 'red'
            //     }}>
            //         <Text>111</Text>
            //     </View>,
            // headerStyle: navigationOptions.headerStyle,
            headerTitle: 'ScrollViewExample',
            //禁止打开菜单
            drawerLockMode: "locked-closed",
            //允许使用返回手势
            gesturesEnabled: true,
        });

    };

    constructor(props) {
        super(props);
        this.ScrollView = null;

        this.state = {
            contentOffsetY: 0,//初始屏幕所在位置
            dimensionsY: Dimensions.get('window').height//取得手机屏幕高度
        };
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text>event.nativeEvent.contentOffset.y:{this.state.contentOffsetY}</Text>
                <ScrollView
                    ref={(ref) => {
                        this.ScrollView = ref;
                    }}
                    style={{flex: 1}}
                    scrollEventThrottle={200}
                    onScroll={(event) => {
                        console.log('onScroll');
                        console.log(event.nativeEvent);

                        let endposition = event.nativeEvent.contentOffset.y;//取得拖拉后的位置
                        this.setState({
                            contentOffsetY: endposition,
                        });

                        // this.props.navigation.setParams({
                        //     headerTitle: "title：" + endposition,
                        // });
                        //
                        // if (endposition <= 20) {
                        //     this.props.navigation.setParams({
                        //         headerTitle: "title：" + endposition,
                        //         headerVisibleFlag: 1,
                        //     });
                        // } else {
                        //     this.props.navigation.setParams({
                        //         headerTitle: "title：" + endposition,
                        //         headerVisibleFlag: 2,
                        //     });
                        // }

                    }}

                    // 开始拖拽
                    onScrollBeginDrag={(event) => {
                        // console.log("scroll drag begin...");
                        // console.log('contentOffset----');
                        // console.log(event.nativeEvent.contentOffset);
                        // console.log('contentOffset----');
                    }}
                    // // 停止拖拽
                    // onScrollEndDrag={(event)=>{
                    //     console.log("scroll drag end...");
                    //     console.log(event);
                    // }}
                    // 停止拖拽
                    onScrollEndDrag={(event) => {

                        // console.log('onScrollEndDrag');
                        //
                        // console.log('contentOffset----');
                        // console.log(event.nativeEvent.contentOffset);
                        // console.log('contentOffset----');

                        // let endposition = event.nativeEvent.contentOffset.y;//取得拖拉后的位置
                        //
                        // this.props.navigation.setParams({
                        //     headerTitle:"endposition："+ endposition,
                        // });
                        //
                        // let stepheight = this.state.dimensionsY;
                        //  alert(endposition+","+this.state.positionY);

                        // let flag = endposition - this.state.positionY;
                        // if (flag > 0) {
                        //     var newpositionY = this.state.positionY + stepheight;
                        //     if (newpositionY >= (2 * stepheight)) {
                        //         newpositionY = 2 * stepheight;
                        //     }
                        //     this.ScrollView.scrollTo({y: newpositionY});
                        //     this.setState({positionY: newpositionY});
                        // } else if (flag < 0) {
                        //     let newpositionY = this.state.positionY - stepheight;
                        //     this.ScrollView.scrollTo({y: newpositionY});
                        //     this.setState({positionY: newpositionY});
                        // }
                    }}

                    onResponderMove={(event) => { //当用户正在屏幕上移动手指时调用这个函数

                        console.log('onResponderMove');

                        console.log('contentOffset----');
                        console.log(event.nativeEvent.contentOffset);
                        console.log('contentOffset----');
                    }}

                    onMomentumScrollStart={(event) => { // 滚动动画开始时调用此函数

                        console.log('onMomentumScrollStart');
                        console.log('contentOffset----');
                        console.log(event.nativeEvent.contentOffset);
                        console.log('contentOffset----');
                    }}

                >

                    {
                        this.renderItem()
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }


    renderItem() {
        // 数组
        const itemAry = [];
        // 颜色数组
        const colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
        // 遍历
        for (let i = 0; i < colorAry.length; i++) {
            itemAry.push(
                <View key={i} style={[styles.itemStyle, {backgroundColor: colorAry[i]}]}></View>
            );
        }
        return itemAry;
    }


}

const styles = StyleSheet.create({
    scrollViewStyle: {
        // 背景色
        backgroundColor: 'red'
    },

    itemStyle: {
        // 尺寸
        width: '100%',
        height: 200
    },
});