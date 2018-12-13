import React from 'react';
import {
    View,
    Text,
    Button,
    Animated
} from 'react-native';


export default class MySpringAnimation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),
            bounceValue: new Animated.Value(0),  //初始缩放为0
        }
    }

    componentDidMount() {
        //开启动画
        this._startAnimation();
    }

    _startAnimation = () => {
        //可选的动画类型：spring,decay,timing
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1,
            }
        ).start();
    };

    render() {
        return (
            <Animated.View style={{
                backgroundColor: 'red',
                width: this.state.width,
                height: this.state.height,
                transform: [    //transform是一个有序数组（动画按顺序执行）
                    {
                        scale:this.state.bounceValue
                    }
                ]
            }}>
            </Animated.View>
        )
    }


}
