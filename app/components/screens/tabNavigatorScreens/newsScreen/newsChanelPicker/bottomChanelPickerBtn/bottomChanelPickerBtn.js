import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';

export class BottomChanelPickerBtn extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    setChanel = () => {
        const { func, text } = this.props;
        func(text);
    }

    render() {
        const {text, id} = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.setChanel} testID = {`HelpScreenBtnID${id}ID`} accessibilityLabel={`HelpScreenBtnID${id}ID`}>
                <View style={styles.textWrapper}>
                    <Text style={styles.bottomText}>{ text }</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
};