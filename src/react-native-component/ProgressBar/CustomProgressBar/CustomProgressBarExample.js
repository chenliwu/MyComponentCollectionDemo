import React, {Component} from 'react';
import {
    View,
} from 'react-native';


import CustomProgressBar from './CustomProgressBar';

export default class CustomProgressBarExample extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            progress: 0
        };
        this.currProgress = 0;
        this.currBuffer = 0;
    }

    render() {
        return (
            <View>
                <CustomProgressBar
                    ref="progressBar"
                    progressColor={'green'}
                    style={{
                        marginTop: 100,
                    }}
                />
            </View>
        );
    }

    componentDidMount() {
        let self = this;
        this.timer = setInterval(() => {
            if (self.currProgress >= 1) {
                clearTimeout(this.timer);
            }
            self.currProgress += 0.1;
            self.refs.progressBar.progress = self.currProgress;
        }, 1000);
    }
}