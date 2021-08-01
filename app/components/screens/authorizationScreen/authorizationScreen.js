import React, { Component } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonInput } from '../../commonComponents/commonInput/commonInput';
import { filterEmail, filterPassword } from '../../../api/regexFilters/regexFilters';
import { localization } from '../../../common/localization';
import ButtonSubmit from '../../commonComponents/buttonSubmit/buttonSubmit';
import Background from '../../commonComponents/svg/Background';
import Logo from '../../commonComponents/svg/logo';
import ButtonForgotPassword from './authoriztionElements/buttonForgotPassword/buttonForgotPassword';
import { setAuthorizationEmail, setAuthorizationPassword } from './reducer/authorizationDataAction';
import InputPasswordWithSVG from './authoriztionElements/inputPasswordWithSVG/inputPasswordWithSVG';
import { showAuthorizationSpiner } from '../../commonComponents/buttonSubmit/redux/spinersAction';
import ButtonBack from '../../commonComponents/buttonBack/buttonBack';
import { crmlogin } from '../../../api/autorization/autorizationSingletone';
import Utils from '../../../api/utils/utils';

const { isIOS } = Utils;

export class AuthorizationScreen extends Component {
    static navigationOptions = () => {
        return {
            header: null,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            isAuthorizationButtomDisabled: true,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { email, password } = nextProps.authorizationData;
        if (email.isValid && password.isValid ) {
            this.setState({ isAuthorizationButtomDisabled: false });
        } else {
            this.setState({ isAuthorizationButtomDisabled: true });
        }
    }

    UNSAFE_componentWillUnmount() {
        const { setAuthorizationEmail, setAuthorizationPassword, } = this.props;
        setAuthorizationEmail({ isValid: false, value: null });
        setAuthorizationPassword({ isValid: false, value: null });
    }

    sendAuthorizationData = () => {
        const { showAuthorizationSpiner, authorizationData: { email, password }, navigation } = this.props;
        showAuthorizationSpiner();
        crmlogin.login(email.value, password.value, navigation);
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        const { authorizationData: { password, email }, setAuthorizationEmail, setAuthorizationPassword, authorizationSpiner, navigation, language } = this.props;
        const { isAuthorizationButtomDisabled } = this.state;
        const local = localization[language];
        return (
            <KeyboardAvoidingView style={styles.wrapperAbsolute} behavior={isIOS ? "padding" : null} enabled >
                <StatusBar barStyle="light-content" backgroundColor="#000756"/>
                <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled" contentContainerStyle={{ alignItems: 'center', }}>
                    <View style={styles.backgroundBlue}>
                        <Background />
                    </View>
                    <View style={styles.buttonGoBackWrapper}>
                        <ButtonBack id="AuthorizationID" navigation={navigation} />
                    </View>
                    <View style={styles.logoWrapper}>
                        <Logo />
                    </View>
                    <View style={styles.container} >
                        <Text style={styles.title}>{local.LogInToTheAccount}</Text>
                        <CommonInput
                            keyboardType="email-address"
                            placeholder={local.placeHolder.email}
                            errorText={local.errors.errorEmail}
                            filter={filterEmail}
                            action={setAuthorizationEmail}
                            isValid={email.isValid}
                            testID="InputEmailAutorizationID"
                            textErrorID="InputErrorEmailAutorizationID"
                            currentLanguageName={language}
                        />
                        <InputPasswordWithSVG
                            placeholder={local.placeHolder.password}
                            errorText={local["Password failed"]}
                            filter={filterPassword}
                            action={setAuthorizationPassword}
                            isValid={password.isValid}
                            testID="InputPasswordWithSVGID"
                            textErrorID="InputPasswordWithSVGErrorID"
                            currentLanguageName={language}
                        />
                        <ButtonForgotPassword text={local["Forgot password?"]} />
                        <ButtonSubmit
                            text={local.enter}
                            testID="ButtonSubmitAutorizationID"
                            isDisabled={isAuthorizationButtomDisabled}
                            isShowSpiner={authorizationSpiner}
                            onPress={this.sendAuthorizationData}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    authorizationData: state.authorizationData,
    authorizationSpiner: state.spiners.authorizationSpiner,
    isConnected: state.connectionStatus.isConnected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthorizationEmail,
    setAuthorizationPassword,
    showAuthorizationSpiner,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);