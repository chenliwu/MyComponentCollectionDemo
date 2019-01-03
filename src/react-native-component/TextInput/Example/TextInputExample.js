import React from 'react';
import {
    Text,
    View,
    TextInput,
    Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;


export default class TextInputExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            keyValue: '',
        }
    }


    render() {
        return (
            <View style={{
                marginTop: 100,
                flex: 1,
                flexDirection: 'column',
                //justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        height: 40,
                        width: screenWidth - 50,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}

                    onChangeText={(text) => {
                        //IOS端点击完成会多输入一个换行符\n
                        this.setState({
                            text: text,
                        })
                    }}
                    value={this.state.text}

                    onKeyPress={(event) => {
                        //onKeyPress在onChangeText之前调用
                        //传递给回调函数的参数为{ nativeEvent: { key: keyValue } }，其中keyValue即为被按下的键。
                        //console.log(event);
                        //console.log(event.nativeEvent);
                        // this.setState({
                        //     keyValue: keyValue,
                        // });
                    }}

                    onSubmitEditing={()=>{
                        //此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用。
                        console.log('onSubmitEditing');
                    }}

                    //决定“确定”按钮显示的内容。在Android上你还可以使用returnKeyLabel。
                    returnKeyType={'done'}

                />
                <Text>输入的文本值：{this.state.text}</Text>
                <Text>键盘按下的值：{this.state.keyValue}</Text>
            </View>
        );
    }
}
