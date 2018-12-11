import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Swipeable from 'react-native-swipeable';

/**
 * 集成react-native-swipeable的滑动组件
 */
export default class MySwipeableExample extends Component {

    static navigationOptions = {
        headerTitle: 'react-native-swipeable',
    };

    state = {
        currentlyOpenSwipeable: null,   //记录当前滑动的组件
    };

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };


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
     * 渲染item组件（数据行）
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        const {currentlyOpenSwipeable} = this.state;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
                if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                    //如果滑动其他行的组件，则关闭当前行的滑动菜单
                    currentlyOpenSwipeable.recenter();
                    this.setState({currentlyOpenSwipeable: null});
                }else{
                    this.setState({currentlyOpenSwipeable: swipeable});
                }
                console.log('onOpen');
                console.log(swipeable);

            },
            onClose: () => {
                console.log('onClose');
                this.setState({currentlyOpenSwipeable: null});
            }
        };
        return (
            <Example1
                item={item}
                onPressItem={(item) => {
                    alert(item.name);
                    currentlyOpenSwipeable.recenter();
                    this.setState({currentlyOpenSwipeable: null});
                }}
                onPressDeleteItem={(item) => {
                    //删除
                    //alert('删除' + item.name);

                    currentlyOpenSwipeable.recenter();
                    this.setState({currentlyOpenSwipeable: null});

                    setTimeout(()=>{
                        let dataList = this.state.dataList;
                        const list = dataList.filter(i => i.id !== item.id);
                        this.setState({
                            dataList: list
                        });
                    },300);

                }}
                {...itemProps}
            />
        )
    };


    render() {

        return (
            <View onScroll={this.handleScroll} style={styles.container}>
                <FlatList
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

            </View>
        );
    }
}


/**
 * 绘制右侧滑动删除按钮
 * @param item
 * @param onPressItem
 * @param onPressDelete
 * @param onOpen
 * @param onClose
 * @returns {*}
 * @constructor
 */
function Example1({item, onPressItem, onPressDeleteItem, onOpen, onClose}) {
    return (
        <Swipeable
            rightButtons={[
                <TouchableWithoutFeedback onPress={() => {
                    //回调点击事件
                    onPressDeleteItem(item);
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingLeft: 20,
                        backgroundColor: 'red'
                    }}>
                        <Text style={{color: '#fff', fontSize: 16}}>删除</Text>
                    </View>
                </TouchableWithoutFeedback>
            ]}
            onRightButtonsOpenRelease={onOpen}
            onRightButtonsCloseRelease={onClose}
        >
            <TouchableWithoutFeedback onPress={()=>{
                onPressItem(item);
            }}>
                <View style={[styles.listItem, {backgroundColor: 'salmon'}]}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    );
}


class RightSwipeComponent extends Component {

    state = {
        rightActionActivated: false,
        toggle: false
    };

    render() {
        const {item} = this.props;
        const {rightActionActivated, toggle} = this.state;

        return (

            <Swipeable

                onRightButtonsOpenRelease={() => {   //右侧滑动按钮即将打开时触发此函数
                    console.log('onRightButtonsOpenRelease');
                    console.log(this.props);
                }}
                onRightButtonsOpenComplete={() => {   //右侧滑动按钮打开完毕触发此函数
                    console.log('onRightButtonsOpenComplete');
                }}

                onRightButtonsCloseRelease={() => {  //右侧滑动按钮关闭后毕触发此函数
                    console.log('onRightButtonsCloseRelease');
                }}
                onRightButtonsCloseComplete={() => {  //右侧滑动按钮即将关闭时毕触发此函数
                    console.log('onRightButtonsCloseComplete');
                }}


                rightActionActivationDistance={75}
                rightButtonWidth={75}
                rightButtons={[
                    <TouchableWithoutFeedback onPress={() => {
                        alert(item.name);
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingLeft: 20,
                            backgroundColor: 'red'
                        }}>
                            <Text style={{color: '#fff', fontSize: 16}}>删除</Text>
                        </View>
                    </TouchableWithoutFeedback>,
                ]}
                // onRightButtonsOpenRelease={() => {
                //     this.setState({
                //         rightActionActivated: true,
                //     });
                // }}
                // onRightButtonsCloseRelease={() => {
                //     this.setState({
                //         rightActionActivated: false,
                //     });
                // }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    //alert(this.props.item.id);
                    this.props.onPressItem(item);
                }}>
                    <View style={[styles.listItem, {backgroundColor: toggle ? 'thistle' : 'darkseagreen'}]}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    listItem: {
        height: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },

});