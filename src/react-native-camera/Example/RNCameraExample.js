import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class BadInstagramCloneApp extends Component {


    static navigationOptions = {
        headerTitle: '相机',
    };


    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({barcodes}) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{fontSize: 14}}> 拍摄图片 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    /**
     * 拍摄图片
     * @returns {Promise<void>}
     */
    takePicture = async function () {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            //data  图片的数据
            // data.base64：图片的base64字符串
            // data.width：图片的宽度
            // data.uri：图片的uri地址
            // data.height：图片的高度
            const data = await this.camera.takePictureAsync(options);
            console.log('takePicture');
            console.log(data);
            console.log(data.uri);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});