import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './style';

export class ListPicker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { showCirle, text, checked, onPress, id, currentTextAlign } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress} testID={`ListPicker${id}ID`} accessibilityLabel={`ListPicker${id}ID`}>
                <Text style={currentTextAlign ? [styles.text, { textAlign: currentTextAlign }] : [styles.text, { textAlign: 'left' }]}>
                    {text}
                </Text>
                {showCirle ? (
                    <View style={styles.circleWrapper}>
                        <View style={styles.circle} >
                            {checked ? <View style={styles.circleChecked} /> : null}
                        </View>
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    }
}   
