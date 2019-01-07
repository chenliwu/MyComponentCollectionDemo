import React, {
    Component,
} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ListView,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

/**
 * 2019-01-07
 * chenlw
 * work：滑动直接删除
 */
class MySwipeListViewExample extends Component {


    static navigationOptions = {
        headerTitle: 'react-native-swipe-list-view'
    };

    constructor(props) {
        super(props);
        this.state = {
            listViewData: Array(20).fill('').map((_, i) => ({key: `${i}`, text: `item #${i}`})),
        };

        this.rowTranslateAnimatedValues = {};
        Array(20).fill('').forEach((_, i) => {
            this.rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });
    }

    onSwipeValueChange = (swipeData) => {
        const {key, value} = swipeData;
        // 375 or however large your screen is (i.e. Dimensions.get('window').width)
        if (value < -375 && !this.animationIsRunning) {
            this.animationIsRunning = true;
            Animated.timing(this.rowTranslateAnimatedValues[key], {toValue: 0, duration: 200}).start(() => {
                const newData = [...this.state.listViewData];
                const prevIndex = this.state.listViewData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                this.setState({listViewData: newData});
                this.animationIsRunning = false;
            });
        }
    };

    render() {
        return (
            <SwipeListView
                useFlatList
                data={this.state.listViewData}

                renderHiddenItem={this._renderHiddenItem}

                renderItem={(data, rowMap) => (
                    <Animated.View style={{
                        height: this.rowTranslateAnimatedValues[data.item.key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 50],
                        }),
                    }}>
                        <TouchableHighlight
                            onPress={() => {
                                console.log('You touched me');
                            }}
                            style={styles.rowFront}
                            underlayColor={'#AAA'}
                        >
                            <View>
                                <Text>I am {data.item.text} in a SwipeListView</Text>
                            </View>
                        </TouchableHighlight>
                    </Animated.View>
                )}
                rightOpenValue={-375}
                onSwipeValueChange={this.onSwipeValueChange}
            />
        );
    }


    _renderHiddenItem=(data,rowMap)=>{
        return(
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        //alert(data.item.name);
                        if (rowMap[data.item.id]) {
                            //关闭滑动菜单栏
                            rowMap[data.item.id].closeRow();
                        }
                        //删除Item
                        const newData = [...this.state.dataList];
                        const prevIndex = this.state.dataList.findIndex(item => item.id === data.item.id);
                        newData.splice(prevIndex, 1);
                        this.setState({
                            dataList: newData
                        });

                    }}>
                    <View style={{
                        width: 60,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                    }}>
                        <Text style={{color: '#fff', fontSize: 16}}>删除</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },

    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },


    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 60
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },

});

export default MySwipeListViewExample;
