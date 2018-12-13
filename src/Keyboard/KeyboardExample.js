import React from 'react';
import {View,Text,Dimensions,Keyboard,
    TextInput
} from 'react-native';
//
// var KeyboardEvents = require('react-native-keyboardevents');
// // var KeyboardEventEmitter = KeyboardEvents.Emitter;
//
// console.log(KeyboardEvents);


export default class KeyboardExample extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height
        }
    }

    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    keyboardWillShow (e) {
        console.log('keyboardWillShow');
        console.log(e);
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({visibleHeight: newSize})
    }

    keyboardWillHide (e) {
        console.log('keyboardWillHide');
        console.log(e);
        this.setState({visibleHeight: Dimensions.get('window').height})
    }

    render () {
        return (
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput
                    ref={"accountTextInput"}
                    style={{
                        flex: 1,
                        padding: 0,
                        height: 100,
                        fontSize: 16
                    }}
                    underlineColorAndroid={"transparent"}
                    autoFocus={true}
                    value={this.state.account}
                    placeholder='请输入账号名称'
                    autoCapitalize={'none'}
                    maxLength={30}
                    onChangeText={text => this.setState({account: text})}
                    returnKeyType={'next'}
                />
            </View>
        )
    }
}
