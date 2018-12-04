import React, {Component} from "react";
import {
    Image
} from 'react-native';
import {
    Container,
    Content,
    Accordion,
    Text,
    View
} from "native-base";

import CategoryItem from './CategoryItem';


/**
 * 手风琴的内容数组
 * @type {[null,null,null]}
 */
const dataArray = [
    {
        title: "筛选条件1",
        content:
            "筛选条件1  Content"
    },
    {
        title: "筛选条件2",
        content:
            "筛选条件2  Content"
    },
    {
        title: "筛选条件3",
        content:
            "筛选条件3  Content"
    }
];

class AccordionCustomHeaderContent extends Component {

    static navigationOptions = {
        headerTitle: 'NativeBase手风琴'
    };

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
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#A9DAD6"
                }}
            >
                <Text style={{fontWeight: "600"}}>
                    {" "}{item.title}
                </Text>
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'red',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text>选中数量</Text>
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
     * @param item
     * @returns {XML}
     * @private
     */
    _renderContent(item) {
        return (
            <Text
                style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic"
                }}
            >
                {item.content}
            </Text>
        );
    }

    render() {
        return (
            <Container>
                <Content padder style={{backgroundColor: "white"}}>
                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                </Content>
            </Container>
        );
    }
}

export default AccordionCustomHeaderContent;
