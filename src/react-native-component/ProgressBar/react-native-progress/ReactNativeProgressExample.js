import React, {Component} from 'react';

import {StyleSheet, Text, View, Dimensions} from 'react-native';

import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
});

export default class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            //indeterminate: true,  //如果设置为true，则指示器将旋转，并且将忽略进度prop。
            indeterminate: false,
        };
    }

    componentDidMount() {
        //this.animate();
        this.animate_1();
    }

    animate() {
        let progress = 0;
        this.setState({progress});
        setTimeout(() => {
            this.setState({indeterminate: false});
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({progress});
            }, 500);
        }, 1500);
    }

    animate_1() {
        console.log(this.refs.progressBar);
        let progress = 0;
        this.progressBarTimer = setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
                progress = 1;
                this.progressBarTimer && clearInterval(this.progressBarTimer);
            }
            this.setState({progress});
        }, 100);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Progress Example</Text>
                <Progress.Bar
                    ref={'progressBar'}
                    style={styles.progress}
                    width={screenWidth}
                    height={3}
                    borderRadius={0}
                    borderColor={'transparent'}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                    animationType={'timing'}
                />
                {/*<View style={styles.circles}>*/}
                {/*<Progress.Circle*/}
                {/*style={styles.progress}*/}
                {/*progress={this.state.progress}*/}
                {/*indeterminate={this.state.indeterminate}*/}
                {/*/>*/}
                {/*<Progress.Pie*/}
                {/*style={styles.progress}*/}
                {/*progress={this.state.progress}*/}
                {/*indeterminate={this.state.indeterminate}*/}
                {/*/>*/}
                {/*<Progress.Circle*/}
                {/*style={styles.progress}*/}
                {/*progress={this.state.progress}*/}
                {/*indeterminate={this.state.indeterminate}*/}
                {/*direction="counter-clockwise"*/}
                {/*/>*/}
                {/*</View>*/}
                {/*<View style={styles.circles}>*/}
                {/*<Progress.CircleSnail style={styles.progress}/>*/}
                {/*<Progress.CircleSnail*/}
                {/*style={styles.progress}*/}
                {/*color={['#F44336', '#2196F3', '#009688']}*/}
                {/*/>*/}
                {/*</View>*/}
            </View>
        );
    }
}