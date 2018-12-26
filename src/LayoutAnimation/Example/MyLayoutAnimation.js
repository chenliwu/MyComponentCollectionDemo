import React from 'react';
import {
    View,
    LayoutAnimation
} from 'react-native';


export default class MyLayoutAnimation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),
        }
    }

    componentDidMount() {
        //开启动画
        this._startAnimation();
    }

    _startAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 1000,  //动画时长
            create: {    //创建组件动画
                type: LayoutAnimation.Types.spring,  //弹跳动画
                property: LayoutAnimation.Properties.scaleXY,    //缩放
            },
            update: {    //更新组件动画
                type: LayoutAnimation.Types.spring,  //弹跳动画
            }
        });
        this.setState({
            width: this.state.width + 100,
            height: this.state.height + 100,
        });
    };

    render() {
        return (
            <View style={{
                backgroundColor: 'red',
                width: this.state.width,
                height: this.state.height,
            }}>
            </View>
        )
    }


}
