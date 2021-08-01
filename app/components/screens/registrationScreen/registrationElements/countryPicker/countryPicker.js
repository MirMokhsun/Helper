import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';
import { flags } from '../../../countryScreen/countryScreenElements/png_flags';
import Polygon from '../../../../commonComponents/svg/Polygon';
import { setCountry } from '../../../../../api/setCountryName/setCountryName';

export class CountryPicker extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            countryName: 'IO',
        }
    }

    componentDidMount() {
        const { countryKey, language } = this.props;
        this.setState({ countryName: setCountry(countryKey, language) });
    }

    UNSAFE_componentWillReceiveProps({ countryKey, language }) {
        const countryName = setCountry(countryKey, language);
        this.setState({ countryName })
    }

    navigateCountryScreen = () => {
        const { navigation } = this.props;
        navigation.navigate('CountryScreen');
    }

    render() {
        const { countryKey } = this.props;
        const { countryName } = this.state;
        return (
            <TouchableOpacity onPress={this.navigateCountryScreen} testID="BtnCountryPickerRegistrationID" accessibilityLabel="BtnCountryPickerRegistrationID">
                <View style={styles.wrapper}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.activetext} numberOfLines={1}>{countryName}</Text>
                    </View>
                    <View style={styles.svgWrapper}>
                        {flags[countryKey]}
                        <Polygon />
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}

export default withNavigation(CountryPicker);