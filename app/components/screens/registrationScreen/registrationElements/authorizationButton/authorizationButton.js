import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

export class AuthorizationButton extends Component {
    constructor(props){
        super(props)
    }

    routeAuthorization = () => {
        const { navigation } = this.props;
        navigation.navigate('AuthorizationScreen')
    }

    render() {
        const { text, textLogin } = this.props;
        return (
            <View style={styles.wrapper}>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity onPress={this.routeAuthorization} testID="BtnAuthorizationInRegistrationID" accessibilityLabel="BtnAuthorizationInRegistrationID">
                    <View >
                        <Text style={styles.link}>{textLogin}</Text>
                    </View>
                </TouchableOpacity >
            </View>
        )
    }
}

export default withNavigation(AuthorizationButton);