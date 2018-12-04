import React from "react";
import {StyleSheet, Text} from "react-native";

/**
 * 标签
 * this.props.title  要显示的标签名称
 */
export default class CategoryLabel extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text {...this.props} style={styles.categoryLabelText}>{this.props.title}</Text>
        );
    }

}


const styles = StyleSheet.create({
    categoryLabelText: {
        color: '#656565',
        fontSize: 16,
    },
});
