import React, {Component} from "react";
import {
    Image,
    FlatList,
    Text
} from 'react-native';
import {
    Accordion,
    Text as NativeBaseText,
    View,
} from "native-base";

import CategoryItem from "./CategoryItem";
import CategoryLabel from "./CategoryLabel";

import {
    SafeAreaView
} from 'react-navigation';


class AccordionCustomHeaderContent extends Component {

    static navigationOptions = {
        headerTitle: 'NativeBase手风琴'
    };


    constructor(props) {
        super(props);

        ///准备的数据
        const dataList = [
            {
                id: '1',
                name: '筛选标题1',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            },
            {
                id: '2',
                name: '筛选标题2',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            },
            {
                id: '3',
                name: '筛选标题3',
                data: [
                    {
                        name: '条件1',
                    },
                    {
                        name: '条件2',
                    }
                ],
            }
        ];

        this.state = {
            dataList: dataList,
            selectedItemMap: new Map(),//统计不同筛选条件选中的个数,筛选条件组的id作为key
        };

    }


    /**
     * 渲染手风琴的头部
     * @param item
     * @param expanded
     * @returns {XML}
     * @private
     */
    _renderHeader(item, expanded) {
        let selectedItemMap = this.state.selectedItemMap;
        let selectedItemList = selectedItemMap.get(item.id);
        let isShowSelectedNumber = selectedItemList && selectedItemList.length >= 1;

        return (
            <View
                style={{
                    height: 52,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //backgroundColor: "#ddd"
                }}
            >
                <CategoryLabel title={item.name}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        isShowSelectedNumber ?
                            <Text style={{
                                color: '#6991f8',
                                marginRight: 10
                            }}>
                                {this.state.selectedItemMap.get(item.id).length}
                            </Text> : null
                    }


                    {
                        expanded
                            ? <Image source={require("./../../assets/icons/icon_list_down.png")}/>
                            : <Image source={require("./../../assets/icons/icon_list_up.png")}/>
                    }
                </View>

            </View>
        );
    }


    /**
     * 渲染手风琴的主体内容
     *
     * @param topItem
     * @returns {XML}
     * @private
     */
    _renderContent(topItem) {

        let dataList = topItem.data;
        let array = [];
        let rowNumber = 0;  //条件行数
        for (let i = 0; i < dataList.length; i += 3) {
            array.push(dataList.slice(i, i + 3)); ///原生js将数组分割成固定个数一组的小数组
            rowNumber++;
        }
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: "wrap",
                    padding: 10,
                    backgroundColor: '#fff'
                }}>
                    {
                        ///固定个数的小数组再次拆分绘制数据
                        array.map((itemA, indexA) => {
                            //初始化
                            // let selectedItemMap = this.state.selectedItemMap;
                            // selectedItemMap = selectedItemMap.set(indexA.id, []);
                            // this.setState({
                            //     selectedItemMap: selectedItemMap
                            // });

                            return itemA.map((itemB, indexB) => {

                                return (
                                    <CategoryItem
                                        key={itemB.id} parent={topItem} item={itemB}
                                        onPress={(item, parentItem) => {
                                            //alert(parentItem.name);
                                            let selectedItemMap = this.state.selectedItemMap;
                                            let selectedItemList = [];

                                            if (selectedItemMap.has(parentItem.id)) {
                                                selectedItemList = selectedItemMap.get(parentItem.id);
                                            } else {
                                                selectedItemList = new Array();
                                            }

                                            if (item.selected) {
                                                //选中状态，加入数组
                                                selectedItemList.push(item);
                                            } else {
                                                //非选中状态，在数组中移除
                                                selectedItemList = selectedItemList.filter(({name}) => name !== item.name);
                                            }

                                            selectedItemMap = selectedItemMap.set(parentItem.id, selectedItemList);
                                            this.setState({
                                                selectedItemMap: selectedItemMap
                                            });



                                            // ///点击筛选条件按钮的回调事件
                                            // let selectItem = this.state.selectItem;
                                            // if (item.selected) {
                                            //     //选中状态，加入数组
                                            //     selectItem.push(item);
                                            // } else {
                                            //     //非选中状态，在数组中去除   返回false则去除
                                            //     selectItem = selectItem.filter(({name}) => name !== item.name);
                                            // }
                                            // this.setState({selectItem: selectItem});

                                        }}
                                    />
                                );
                            });
                        })
                    }
                </View>
                <View style={{height: 1, backgroundColor: '#f5f5f9',}}/>
            </View>
        );
    }


    render() {

        ///this._renderHeader.bind(this)
        ///bind(this)的作用，可以让绑定的函数获取到父组件的所有属性和状态
        const dataArray = this.state.dataList;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <Accordion
                    dataArray={dataArray}
                    animation={true}
                    expanded={true}
                    renderHeader={this._renderHeader.bind(this)}
                    renderContent={this._renderContent.bind(this)}
                />
            </SafeAreaView>
        );
        // return (
        //     <Container>
        //         <Content padder style={{backgroundColor: "white"}}>
        //             <Accordion
        //                 dataArray={dataArray}
        //                 animation={true}
        //                 expanded={true}
        //                 renderHeader={this._renderHeader}
        //                 renderContent={this._renderContent}
        //             />
        //         </Content>
        //     </Container>
        // );
    }

}

export default AccordionCustomHeaderContent;
