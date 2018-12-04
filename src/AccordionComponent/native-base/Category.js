import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import CategoryItem from "./CategoryItem";
import CategoryLabel from "./CategoryLabel";

import {
    Badge,
    Text as NativeBaseText
} from 'native-base';

const singleRowHeight = 52;

/**
 * 2018-12-4
 * chenlw
 * 一个Category就是一个手风琴item
 *
 * item数据结构
 * （1）name：筛选条件的名称
 * （2）data：具体条件的数组
 */
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowNumber: 0,
            rowHeight: singleRowHeight,
            dataSource: [],
            expand: false,
            selectItem: [],     //选中的条件数组
        }
    }

    /**
     * 准备数据
     */
    componentWillMount = () => {
        let topItem = this.props.item;
        let dataList = topItem.data;

        let arr = [];
        let rowNumber = 0;  //条件行数
        for (let i = 0; i < dataList.length; i += 3) {
            arr.push(dataList.slice(i, i + 3)); ///原生js将数组分割成固定个数一组的小数组
            rowNumber++;
        }
        this.setState({dataSource: arr, rowNumber: rowNumber});
    };

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


                    // let selectItem = this.state.selectItem;
                    // if(!item.selected){
                    //     selectItem.push(item)
                    // }else{
                    //
                    // }
                    // console.log(selectItem);
                    // this.setState({selectItem:selectItem});

                }}/>
            })
        );
    };

    render() {
        if (!this.state.dataSource) {
            return;
        }
        let topItem = this.props.item;

        return (

            <View style={{padding: 15, backgroundColor: "#fff"}}>
                <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => {
                        //图标展开和收合状态的切换
                        if (this.state.expand) {
                            this.setState({expand: !this.state.expand, rowHeight: singleRowHeight});
                        } else {
                            this.setState({
                                expand: !this.state.expand,
                                rowHeight: singleRowHeight * this.state.rowNumber
                            });
                        }
                    }}>
                    <View style={{flexDirection: "row", marginVertical: 5}}>
                        <CategoryLabel title={topItem.name}/>
                        {/*渲染选择的标签*/}
                        {/*{this._renderSelectCategoryLabel()}*/}
                        <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                //backgroundColor: 'red'
                            }}>
                                {
                                    this.state.selectItem.length >= 1 ?
                                        <Badge style={{
                                            backgroundColor: '#6991f8',
                                            marginRight: 10
                                        }}>
                                            <NativeBaseText style={{color: 'white'}}>{this.state.selectItem.length}</NativeBaseText>
                                        </Badge>
                                        : null
                                }

                                {
                                    this.state.expand
                                        ? <Image source={require("./../../assets/icons/icon_list_down.png")}/>
                                        : <Image source={require("./../../assets/icons/icon_list_up.png")}/>
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    //手风琴处于展开状态才渲染主体数据
                    this.state.expand ?
                        <View
                            style={{flexDirection: 'row', marginTop: 5, flexWrap: "wrap",}}>
                            {
                                this.state.dataSource.map((item, index) => {
                                    return this._renderItemContainer(item, topItem);
                                })
                            }
                        </View> : null
                }

            </View>

        );
    }

}
