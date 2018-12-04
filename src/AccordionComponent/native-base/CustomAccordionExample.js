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
            selectedListMap: new Map(),
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
                    <Text style={{
                        color: '#6991f8',
                        marginRight: 10
                    }}>
                        88
                    </Text>
                    {
                        expanded
                            ? <Image source={require("./../../assets/icons/icon_list_down.png")}/>
                            : <Image source={require("./../../assets/icons/icon_list_up.png")}/>
                    }
                </View>

            </View>
        );
    }

    _renderItemContainer = (dataList, topItem) => {
        return (
            dataList.map((itemB, indexB) => {
                return <CategoryItem key={itemB.id} parent={topItem} item={itemB} onPress={(item) => {
                    ///点击筛选条件按钮的回调事件
                    let selectItem = this.state.selectItem;
                    if (item.selected) {
                        //选中状态，加入数组
                        selectItem.push(item);
                    } else {
                        //非选中状态，在数组中去除   返回false则去除
                        selectItem = selectItem.filter(({name}) => name !== item.name);
                    }
                    this.setState({selectItem: selectItem});

                }}/>
            })
        );
    };


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
                            return itemA.map((itemB, indexB) => {

                                return <CategoryItem key={itemB.id} parent={topItem} item={itemB} onPress={(item) => {
                                    ///点击筛选条件按钮的回调事件
                                    // let selectItem = this.state.selectItem;
                                    // if (item.selected) {
                                    //     //选中状态，加入数组
                                    //     selectItem.push(item);
                                    // } else {
                                    //     //非选中状态，在数组中去除   返回false则去除
                                    //     selectItem = selectItem.filter(({name}) => name !== item.name);
                                    // }
                                    // this.setState({selectItem: selectItem});

                                }}/>
                            });
                        })
                    }
                </View>
                <View style={{height: 1, backgroundColor: '#f5f5f9',}}/>
            </View>
        );
    }


    render() {
        const dataArray = this.state.dataList;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <Accordion
                    dataArray={dataArray}
                    animation={true}
                    expanded={true}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
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
