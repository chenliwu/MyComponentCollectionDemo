'use strict';
import React from 'react';
import {
    View,
    StyleSheet,
    ProgressViewIOS
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

export default class ProgressViewExample extends React.Component {

    mixins: [TimerMixin];

    constructor(props){
        super(props);
        this.state={
            progress: 0,
        }
    }

    componentDidMount() {
        this.updateProgress();
    }

    updateProgress() {
        let progress = this.state.progress + 0.01;
        this.setState({
            progress
        });
        //this.requestAnimationFrame(() => this.updateProgress());
        requestAnimationFrame(()=>{
            this.updateProgress();
        });
    }

    getProgress(offset) {
        let progress = this.state.progress + offset;
        //return Math.sin(progress % Math.PI) % 1;
        return progress;
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressViewIOS style={styles.progressView} progress={this.getProgress(0)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="purple"
                                 progress={this.getProgress(0.2)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={this.getProgress(0.4)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="orange"
                                 progress={this.getProgress(0.6)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="yellow"
                                 progress={this.getProgress(0.8)}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: -20,
        backgroundColor: 'transparent',
    },
    progressView: {
        marginTop: 20,
    }
});