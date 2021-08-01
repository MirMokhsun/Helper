import React from 'react';
import { View, Text } from 'react-native';
import Thanks from '../../svg/Thanks';
import { styles } from './styles';

export class ThanksTextAndSVG extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <Thanks />
                {text ? <Text style={styles.text}>{text}</Text> : null}
            </View>
        );
    }
}