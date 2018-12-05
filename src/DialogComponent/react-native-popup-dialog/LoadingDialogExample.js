import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

export default class LoadingDialogExample extends React.Component {

    static navigationOptions = {
        headerTitle: '加载对话框',
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Button title="打开loadingDialog" onPress={() => {
                    this.setState({
                        defaultAnimationDialog: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            defaultAnimationDialog: false,
                        });
                    }, 3000);
                }}/>


                <Dialog
                    onDismiss={() => {
                        this.setState({defaultAnimationDialog: false});
                    }}
                    width={0.4}
                    height={0.2}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    containerStyle={{   //设置dialog容器样式，这个容器布满整个屏幕
                        backgroundColor: '#00000000'
                    }}
                    overlayBackgroundColor='#00000000'  //设置遮盖层的背景色
                    dialogStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                    }}
                    //dialogAnimation={new ScaleAnimation()}  //动画效果
                    // onHardwareBackPress={()=>{
                    //     return false;
                    // }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="large"/>
                        <Text style={{color: '#fff', marginTop: 10}}>加载中...</Text>
                    </View>
                </Dialog>

            </View>
        )
    }

}