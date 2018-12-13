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

/**
 * 2018-12-13
 * chenlw
 * work：  ScrollView组件API学习
 */
export default class ScrollViewExample extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        console.log(navigation);
        console.log(navigationOptions);
        const headerTitle = navigation.getParam('headerTitle',"");

        return ({
            // header:
            //     <View style={{
            //         flex: 1,
            //         backgroundColor: 'red'
            //     }}>
            //         <Text>111</Text>
            //     </View>,
            // headerStyle: navigationOptions.headerStyle,
            headerTitle: headerTitle
        });

    };

    constructor(props) {
        super(props);
        this.ScrollView = null;

        this.state = {
            positionY: 0,//初始屏幕所在位置
            dimensionsY: Dimensions.get('window').height//取得手机屏幕高度
        };
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Text>positionY:{this.state.positionY}</Text>
                <ScrollView
                    ref={(ref) => {
                        this.ScrollView = ref;
                    }}
                    style={{flex: 1}}
                    //scrollEventThrottle={200}
                    onScroll={(event) => {
                        console.log('onScroll');
                        console.log(event);
                        let endposition = event.nativeEvent.contentOffset.y;//取得拖拉后的位置

                        this.props.navigation.setParams({
                            headerTitle:"title："+ endposition,
                        });
                    }}

                // 开始拖拽
                    onScrollBeginDrag={(event) => {
                        console.log("scroll drag begin...");
                        console.log(event);
                    }}
                    // // 停止拖拽
                    // onScrollEndDrag={(event)=>{
                    //     console.log("scroll drag end...");
                    //     console.log(event);
                    // }}
                    // 停止拖拽
                    onScrollEndDrag={(event) => {

                        console.log('onScrollEndDrag');

                        console.log('contentOffset----');
                        console.log(event.nativeEvent.contentOffset);
                        console.log('contentOffset----');

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


                >

                    {
                        this.renderItem()
                    }
                </ScrollView>
            </View>
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