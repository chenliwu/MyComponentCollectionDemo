import React, {
    Component
} from 'react';

import {
    View,
    Button,
    Text,
    NetInfo,
    StyleSheet
} from 'react-native';

import BaseNetInfoComponent from './BaseNetInfoComponent';

/**
 * 2019-01-28
 * chenlw
 *
 * work：测试NetInfo基类
 */
export default class TestBaseNetInfoComponent extends BaseNetInfoComponent {

    static navigationOptions = {
        headerTitle: '测试NetInfo基类'
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>联网状态：{this.state.connectionInfo}</Text>
                <Text>状态说明：{this.state.netTypeMessage}</Text>

                <Button title={'是否联网测试'} onPress={() => {
                    if (this.state.netIsConnected) {
                        alert('设备处于联网');
                    } else {
                        alert('设备处于离线状态');
                    }
                }}/>

            </View>
        )
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});