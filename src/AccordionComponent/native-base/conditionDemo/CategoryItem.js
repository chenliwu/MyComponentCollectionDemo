import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

/**
 * 内容item
 *
 * 数据结构：
 *（1）name：条件名称
 *（2）
 */
export default class CategoryItem extends React.Component {

    item = null;

    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.state = {
            selected: this.item.selected,
        };
    }

    /**
     * 点击事件回调
     * @param item
     * @private
     */
    _onPress = (item) => {
        this.item.selected = !this.item.selected;   //切换选中状态
        this.setState({
            selected: !this.state.selected, //切换选中状态
        });
        this.props.onPress && this.props.onPress(item);
        //this.props.toggleItemSelected(item,this.props.parent);
    };

    render() {
        //const selectItemBackground = this.item.selected ? {backgroundColor: '#E5ECFE', borderColor: "#6991f8"} : {};
        //const selectItemText = this.item.selected ? {color: '#6991f8'} : {};
        const selectItemBackground = this.state.selected ? {backgroundColor: '#E5ECFE', borderColor: "#6991f8"} : {};
        const selectItemText = this.state.selected ? {color: '#6991f8'} : {};
        return (
            <TouchableOpacity
                style={[styles.categoryItem, this.props.style, selectItemBackground]}
                onPress={() => {
                    this._onPress(this.item);
                }}>
                <Text style={[styles.categoryItemText, selectItemText]}>{this.item.name}</Text>
            </TouchableOpacity>
        );
    }


}


const styles = StyleSheet.create({
    categoryItem: {
        paddingHorizontal: 14,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "#e4e4e4",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryItemText: {
        color: "#b4b4b4",
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
});
