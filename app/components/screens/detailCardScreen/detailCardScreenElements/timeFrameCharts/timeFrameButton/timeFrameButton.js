import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';

export class TimeFrameButton extends PureComponent {
    constructor(props) {
        super(props);

    }

    changeFrame = () => {
        const { setFrameFunction, frame } = this.props;
        setFrameFunction(frame);
    };

    render() {
        const { text, isActive, id } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.changeFrame} testID={`TimeFrameButton${id}ID`} accessibilityLabel={`TimeFrameButton${id}ID`}>
                <View style={styles.container} >
                    <Text style={[styles.text, isActive ? styles.activeText : null]}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default TimeFrameButton;