import React, {
    Component
} from 'react';

import {
    View,
    Button,
    StyleSheet
} from 'react-native';

import NetInfoUtils from './NetInfoUtils';

/**
 * 2019-01-28
 * chenlw
 *
 * work：测试NetInfo工具类
 */
export default class TestNetInfoUtils extends Component {

    static navigationOptions = {
        headerTitle: '测试NetInfo工具类'
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>

                <Button title={'是否联网测试'} onPress={() => {
                    NetInfoUtils.getNetworkIsConnectedState((isConnected) => {
                        if (isConnected) {
                            alert('设备处于联网');
                        } else {
                            alert('设备处于离线状态');
                        }
                    });

                }}/>

            </View>
        )
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