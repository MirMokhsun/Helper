import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

export class CountryItem extends Component {
    constructor(props){
        super(props)
    }

    setCountry = () => {
        const { setPhcode, setRegistrationCountry, navigation, country, countryKey } = this.props;
        setPhcode(country.phcode);
        setRegistrationCountry({ isValid: true, value: country.countryName, countryKey });
        navigation.goBack();
    };

    render() {
        const { country, accessibilityLabel, testID, flag } = this.props;
        return (
            <TouchableOpacity onPress={this.setCountry} accessibilityLabel={accessibilityLabel} testID={testID}>
                <View style={styles.countryContainer}>
                    <View style={styles.flagnadname}>
                        <View style={styles.imagewrapper}>
                            {flag}
                        </View>
                        <Text style={styles.text} numberOfLines={1}>{country.countryName}</Text>
                    </View>
                    <Text style={styles.text} >+{country.phcode}</Text>
                </View>
            </TouchableOpacity>
        )
    }
};

export default withNavigation(CountryItem);