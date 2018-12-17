import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated,Button} from 'react-native';

export default class ScrollViewExample2 extends Component {


    constructor(props) {
        super(props);
        // Intialize to default value
        this.state = {
            backgroundColor: new Animated.Value(0)
        };
    }

    onPress = () => {
        // onPress, initialize to default value using setState and start animation
        // after the state has been updated
        this.setState({backgroundColor: new Animated.Value(0)}, () => {
            Animated.timing(this.state.backgroundColor, {
                toValue: 100,
                duration: 1000
            }).start();
        });
    };


    render() {
        return (
            <Animated.ScrollView
                style={[
                    //styles.container,
                    // Interpolation mapping from numbers to strings (colors)
                    {
                        backgroundColor: this.state.backgroundColor.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["#00aaFF", "#808080"]
                        })
                    }
                ]}
            >
                <Button // onPress to start Animation
                    title={'开启动画'}
                    onPress={() => this.onPress()}>
                </Button>

            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});