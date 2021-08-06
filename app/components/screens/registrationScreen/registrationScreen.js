import React, { Component } from 'react';
import { View, ScrollView, BackHandler, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonInput } from '../../commonComponents/commonInput/commonInput';
import { filterEmail, filterName, filterPhone } from '../../../api/regexFilters/regexFilters';
import { localization } from '../../../common/localization';
import {
    setRegistrationCheckbox,
    setRegistrationPhone,
    setRegistrationCountry,
    setRegistrationEmail,
    setRegistrationFirstName,
    setRegistrationLastName
} from './redux/registrationDataAction';
import CountryPicker from './registrationElements/countryPicker/countryPicker';
import PhoneInput from './registrationElements/phoneInput/phoneinput';
import AgreementAndCheckbox from './registrationElements/agreementAndCheckbox/agreementAndCheckbox';
import ButtonSubmit from '../../commonComponents/buttonSubmit/buttonSubmit';
import AuthorizationButton from './registrationElements/authorizationButton/authorizationButton';
import Logo from '../../commonComponents/svg/logo';
import Background from '../../commonComponents/svg/Background';
import { crmRegistration } from '../../../api/registration/registrationSingleton';
import { showRegistrationSpiner } from '../../commonComponents/buttonSubmit/redux/spinersAction';
import Utils from '../../../api/utils/utils';
import LoginFacebook from './registrationElements/facebookAuth';
import { NavigationEvents } from 'react-navigation';

const { isIOS } = Utils;

export class RegistrationScreen extends Component {
    static navigationOptions = () => {
        return {
            gesturesEnabled: false,
            header: null,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isRegistrationButtomDisabled: true,
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackRegistrationScreen', this.hardwareBackRegistrationScreen);
        this.clearRegistrationFields();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { email, firstName, lastName, country, phone, agreementCheckbox } = nextProps.registrationData;
        let isRegistrationButtomDisabled = true;
        if (email.isValid && firstName.isValid && lastName.isValid && country.isValid && phone.isValid && agreementCheckbox.isValid && nextProps.isConnected) {
            isRegistrationButtomDisabled = false;
        }
        this.setState({ isRegistrationButtomDisabled });
    }

    hardwareBackRegistrationScreen = () => {
        const { navigation } = this.props;
        if (navigation.isFocused()) {
            BackHandler.exitApp();
        }
    }

    clearRegistrationFields = () => {
        const { setRegistrationEmail,
            setRegistrationFirstName,
            setRegistrationLastName,
            setRegistrationPhone,
            setRegistrationCheckbox,
            registrationData
        } = this.props;
        setRegistrationFirstName({ isValid: false, value: null });
        setRegistrationEmail({ isValid: false, value: null });
        setRegistrationLastName({ isValid: false, value: null });
        setRegistrationPhone({ isValid: false, value: null });
        if (registrationData.agreementCheckbox.isValid) {
            setRegistrationCheckbox();
        }
    }
    
    getLanguageForCRM = (appsFlyerData, language )=>{
        let lang = ''

        if(appsFlyerData.campaign){
           lang = appsFlyerData.campaign.split("-").pop().toUpperCase()
        }
        else{
            lang = language.toUpperCase()
        }
        return lang
    };

    sendRegistrationData = () => {
        const { registrationData: { email, firstName, lastName, country, phone, agreementCheckbox, phoneCode }, showRegistrationSpiner, appsFlyerData, language, navigation } = this.props;
        if (firstName.value && lastName.value && email.value && agreementCheckbox.isValid && country.countryKey && phone.value && phoneCode && language) {
            crmRegistration.registrationLead(firstName.value, lastName.value, email.value, agreementCheckbox.isValid, country.countryKey, phoneCode, phone.value, this.getLanguageForCRM(appsFlyerData, language), appsFlyerData);
        }
        showRegistrationSpiner();
        navigation.navigate("TabAppNavigator")
    }

    render() {
        const { setRegistrationCheckbox, setRegistrationFirstName, setRegistrationLastName, setRegistrationEmail, setRegistrationPhone,
            registrationData: { phoneCode, email, firstName, lastName, country, phone, agreementCheckbox }, registrationSpiner, language } = this.props;
        const { isRegistrationButtomDisabled } = this.state;
        const local = localization[language];
        return (
            <KeyboardAvoidingView style={styles.wrapperAbsolute} behavior={isIOS ? "padding" : null} enabled >
                <StatusBar barStyle="light-content" backgroundColor="#000756" />
                <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled" contentContainerStyle={{ alignItems: 'center', }}>
                    <View style={styles.backgroundBlue}>
                        <Background />
                    </View>
                    <View style={styles.logoWrapper}>
                        <Logo />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.registrationTitle}>{local.createAccount}</Text>
                        <CommonInput
                            placeholder={local.placeHolder.name}
                            errorText={local.errors.errorFirstName}
                            filter={filterName}
                            action={setRegistrationFirstName}
                            isValid={firstName.isValid}
                            testID="InputFirstNameRegistrationID"
                            textErrorID="FirstNameErrorRegostrationID"
                            currentLanguageName={language}
                        />
                        <CommonInput
                            placeholder={local.placeHolder.lastName}
                            errorText={local.errors.errorLastName}
                            filter={filterName}
                            action={setRegistrationLastName}
                            isValid={lastName.isValid}
                            testID="InputLastNameRegistrationID"
                            textErrorID="LastNameErrorRegostrationID"
                            currentLanguageName={language}
                        />
                        <CommonInput
                            keyboardType="email-address"
                            placeholder={local.placeHolder.email}
                            errorText={local.errors.errorEmail}
                            filter={filterEmail}
                            action={setRegistrationEmail}
                            isValid={email.isValid}
                            testID="InputEmailRegistrationID"
                            textErrorID="EmailErrorRegostrationID"
                            currentLanguageName={language}
                        />
                        <CountryPicker value={country.value} isValid={country.isValid} countryKey={country.countryKey} language={language} />
                        <PhoneInput
                            phcode={phoneCode}
                            maxWidth={230}
                            placeholder={local.placeHolder.phoneNumber}
                            errorText={local.errorMessage.phoneNumber}
                            filter={filterPhone}
                            action={setRegistrationPhone}
                            isValid={phone.isValid}
                            currentLanguageName={language}
                        />
                        <AgreementAndCheckbox
                            title={local["user agreement2"]}
                            isChecked={agreementCheckbox.isValid}
                            setCheckedBox={setRegistrationCheckbox}
                            textWithClick={local["user agreement"]}
                            text={local["I have read and agree with"]}
                        />
                        <ButtonSubmit
                            text={local.Registration}
                            testID="ButtonSubmitRegistrationID"
                            isDisabled={isRegistrationButtomDisabled}
                            isShowSpiner={registrationSpiner}
                            onPress={this.sendRegistrationData}
                        />
                    </View>
                    <LoginFacebook/>
                    <AuthorizationButton
                        text={local["Already have an account?"]}
                        textLogin={local.login}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    appsFlyerData: state.appsFlyerData.appsFlyerData,
    language: state.currentLanguage.language,
    registrationData: state.registrationData,
    registrationSpiner: state.spiners.registrationSpiner,
    isConnected: state.connectionStatus.isConnected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setRegistrationLastName,
    setRegistrationFirstName,
    setRegistrationEmail,
    setRegistrationCountry,
    setRegistrationPhone,
    setRegistrationCheckbox,
    showRegistrationSpiner
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);