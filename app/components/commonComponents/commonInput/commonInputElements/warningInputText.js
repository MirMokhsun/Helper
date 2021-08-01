/* eslint-disable react/destructuring-assignment */
import React from "react";
import { View, Text } from 'react-native';
import { styles } from './styles';

export class WarningInputText extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            warningInputText: null
        }
    }

    UNSAFE_componentWillReceiveProps({ isShowWarningText, text, testID, maxWidth }) {
        let result = (<View style={{ height: 15 }} />);
        if (isShowWarningText) {
            result =
                (<View style={[styles.container, { width: maxWidth || 290 }]}>
                    <Text
                        style={styles.warningInput}
                        testID={testID}
                        accessibilityLabel={testID}>
                        {text}
                    </Text>
                </View>);
        }
        this.setState({ warningInputText: result });
    }

    render() {
        return this.state.warningInputText;
    }
}