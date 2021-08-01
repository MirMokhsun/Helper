import React, { Component } from 'react';
import { Keyboard, FlatList, StatusBar, KeyboardAvoidingView } from 'react-native';
import CountryItem from './countryScreenElements/countryItem/countryItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CountrySearch from './countryScreenElements/countrySearch/countrySearch';
import { flags } from './countryScreenElements/png_flags/index';
import { styles } from './styles';
import { returnCountriesLocalization } from '../../../api/setCountryName/setCountryName';
import { setRegistrationPhoneCode, setRegistrationCountry } from '../registrationScreen/redux/registrationDataAction';
import Utils from '../../../api/utils/utils';

export class CountryScreen extends Component {

    static navigationOptions = {
        headerBackTitleVisible: true,
        headerBackTitle: null,
        headerTintColor: '#000756',
        headerTitleStyle: {
            backgroundColor: "#E5E5E5",
        },
        headerStyle: {
            backgroundColor: "#E5E5E5",
            borderBottomWidth: 0,
            borderColor: "#5A6772",
            elevation: 0,
        },
        headerRight: (<CountrySearch />),
        headerRightContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 2,
            width: '85%',
            paddingHorizontal: 10,
        },

    }

    constructor(props) {
        super(props)
        this.state = {
            countries: null,
            isVisible: false,
        }
    }

    componentDidMount() {
        const { searchCountryText } = this.props;
        const countries = this.renderCountries(searchCountryText);
        this.setState({ countries });
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }

    UNSAFE_componentWillReceiveProps({ searchCountryText }) {
        const countries = this.renderCountries(searchCountryText);
        this.setState({ countries });
    }

    UNSAFE_componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        this.setState({
            isVisible: true
        })
    }

    keyboardWillHide = event => {
        this.setState({
            isVisible: false
        })
    }

    renderCountries = (searchCountryText) => {
        const { language, setRegistrationCountry, setRegistrationPhoneCode } = this.props;
        let countries = null;
        const objectsCountry = returnCountriesLocalization(language);
        if (objectsCountry) {
            countries = [];
            for (const key in objectsCountry) {
                if (objectsCountry[key].countryName.toLowerCase().includes(searchCountryText) && key !== "RO") {
                    countries.push(
                        <CountryItem
                            key={key}
                            setRegistrationCountry={setRegistrationCountry}
                            setPhcode={setRegistrationPhoneCode}
                            country={objectsCountry[key]}
                            flag={flags[key]}
                            testID={`${key}ID`}
                            countryKey={key}
                            accessibilityLabel={`${key}ID`}
                        />
                    );
                }
            }
        }
        return countries;
    }

    render() {
        // StatusBar.setBarStyle('dark-content', true);
        const { countries, isVisible } = this.state;
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Utils.isIOS ? "padding" : null} >
                <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
                <FlatList data={countries} renderItem={({ item }) => item} keyboardShouldPersistTaps="handled" style={{ marginBottom: (Utils.isIOS && isVisible) ? 60 : 0 }} />
            </KeyboardAvoidingView>)
    }
}

const mapStateToProps = state => ({
    searchCountryText: state.searchCountryText.text,
    language: state.currentLanguage.language,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setRegistrationCountry,
    setRegistrationPhoneCode,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen);