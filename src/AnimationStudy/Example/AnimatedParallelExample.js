import React, {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    Image
} from 'react-native';

/**
 * 并行动画
 */
export default class AnimatedParallelExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grassTransY: new Animated.Value(Dimensions.get('window').height / 2),
            bigDogeTrans: new Animated.ValueXY({
                x: 100,
                y: 298
            })
        }
    }

    componentDidMount() {
        Animated.timing(this.state.grassTransY, {
            toValue: 200,
            duration: 250,
            //easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
            easing: Easing.linear
        }).start();

        Animated.timing(this.state.bigDogeTrans, {
            toValue: {
                x: Dimensions.get('window').width / 2 - 139,
                y: -200
            },
            duration: 2000,
            delay: 1000
        }).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.doges, {
                    transform: this.state.bigDogeTrans.getTranslateTransform()
                }]}>
                    <Image source={require('./../../assets/airport-photo.jpg')}/>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.grass,
                        {
                            transform: [{translateY: this.state.grassTransY}]
                        }]
                    }
                >
                </Animated.View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    grass: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        backgroundColor: '#A3D900',
        height: 200
    },
    doges: {
        position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73B9FF'
    }
});