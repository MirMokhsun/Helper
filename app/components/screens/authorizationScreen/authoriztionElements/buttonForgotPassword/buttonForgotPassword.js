import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { styles } from './styles';

export class ButtonForgotPassword extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    routeAuthorization = () => {
        const { navigation } = this.props;
        navigation.navigate('ForgotPasswordScreen')
    }

    render() {
        const { text } = this.props;
        return (
            <TouchableOpacity onPress={this.routeAuthorization} testID="ForgotPasswordAuthorizationID" accessibilityLabel="ForgotPasswordAuthorizationID">
                <View style={styles.wrapper}>
                    <Text style={styles.text}>{ text }</Text>
                </View>
            </ TouchableOpacity>
        )
    }
}

export default withNavigation(ButtonForgotPassword);