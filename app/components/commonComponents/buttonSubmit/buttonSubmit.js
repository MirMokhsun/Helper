import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

export class ButtonSubmit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spiner: null
        }
    }

    UNSAFE_componentWillReceiveProps({ isShowSpiner }) {
        let spiner = null;
        if (isShowSpiner) {
            spiner =
                (<View style={styles.containerSpiner} >
                    <ActivityIndicator size="large" color="#EAF1F4" />
                </View>);
        }
        this.setState({ spiner });
    }

    render() {
        const { testID, isDisabled, text, width, isShowSpiner, onPress } = this.props;
        const { spiner } = this.state;
        return (
            <TouchableOpacity disabled={(isDisabled || isShowSpiner)} onPress={onPress} testID={testID} accessibilityLabel={testID}>
                <View style={[styles.wrapper, isDisabled ? styles.btnBackgroundColorDarkGrey : styles.btnBackgroundColorGreen, { width: width || 290 }]}>
                    <Text style={styles.text}>{text}</Text>
                    {spiner}
                </View>
            </TouchableOpacity>
        )
    }
}

export default ButtonSubmit;