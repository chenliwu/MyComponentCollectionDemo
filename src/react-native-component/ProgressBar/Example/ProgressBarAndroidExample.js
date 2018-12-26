import React from 'react';
import {
    Text,
    View,
    ProgressBarAndroid,
} from 'react-native';

/**
 *
 ProgressBarAndroid
 封装了Android平台上的ProgressBar的React组件。这个组件可以用来表示应用正在加载或者有些事情正在进行中。

 props:
 （1）color：进度条的颜色。
 （2）indeterminate：决定进度条是否要显示一个不确定的进度。注意这个在styleAttr是Horizontal的时候必须是false。
 （3）progress：当前的进度值（在0到1之间）。
 （4）styleAttr
 进度条的样式。可取值有：
 Horizontal
 Small
 Large
 Inverse
 SmallInverse
 LargeInverse


 */
export default class ProgressBarAndroidExample extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    ProgressBarAndroid控件实例
                </Text>
                <ProgressBarAndroid
                    color="red"
                    styleAttr='Inverse'
                />

                <ProgressBarAndroid
                    color="green"
                    styleAttr='Horizontal'
                    progress={0.2}
                    indeterminate={false}
                    style={{marginTop: 10}}
                />

                <ProgressBarAndroid
                    //color="green"
                    styleAttr='Horizontal'
                    indeterminate={true}
                    style={{marginTop: 10}}
                />

                <ProgressBarAndroid
                    color="black"
                    styleAttr='SmallInverse'
                    style={{marginTop: 10}}
                />

                <ProgressBarAndroid
                    styleAttr='LargeInverse'
                    style={{marginTop: 10}}
                />
            </View>
        );
    }
}
