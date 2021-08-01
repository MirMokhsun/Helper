import React, { Component } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonInput } from '../../commonComponents/commonInput/commonInput';
import { filterEmail } from '../../../api/regexFilters/regexFilters';
import { localization } from '../../../common/localization';
import ButtonSubmit from '../../commonComponents/buttonSubmit/buttonSubmit';
import Background from '../../commonComponents/svg/Background';
import Logo from '../../commonComponents/svg/logo';
import { setForgotPasswordEmail } from './redux/forgotPasswordDataAction';
import { showForgotPasswordSpiner } from '../../commonComponents/buttonSubmit/redux/spinersAction';
import { ButtonBack } from '../../commonComponents/buttonBack/buttonBack';
import { crmForgotPassword } from '../../../api/forgotPassword/forgotPasswordSingleton';
import Utils from '../../../api/utils/utils';

const { isIOS } = Utils;

export class ForgotPasswordScreen extends Component {
    static navigationOptions = () => {
        return {
            header: null,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isForgotPasswordDisabled: true,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isValid } = nextProps.forgotPasswordData.email;
        if (isValid && nextProps.isConnected) {
            this.setState({ isForgotPasswordDisabled: false });
        } else {
            this.setState({ isForgotPasswordDisabled: true });
        }
    }

    UNSAFE_componentWillUnmount() {
        const { setForgotPasswordEmail } = this.props;
        setForgotPasswordEmail({ isValid: false, value: null });
    }

    sendForgotPasswordData = () => {
        const { showForgotPasswordSpiner, forgotPasswordData: { email }, language } = this.props;
        showForgotPasswordSpiner();
        crmForgotPassword.forgotpassword(email.value, language);
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        // StatusBar.setBarStyle('light-content', true);
        const { forgotPasswordData: { email }, setForgotPasswordEmail, forgotPasswordSpiner, navigation, language } = this.props;
        const { isForgotPasswordDisabled } = this.state;
        return (
            <KeyboardAvoidingView style={styles.wrapperAbsolute} behavior={isIOS ? "padding" : null} enabled >
                <StatusBar barStyle="light-content" backgroundColor="#000756"/>
                <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled" contentContainerStyle={{ alignItems: 'center', }}>
                    <View style={styles.backgroundBlue}>
                        <Background />
                    </View>
                    <View style={styles.buttonGoBackWrapper}>
                        <ButtonBack id="ForgotPasswordID" navigation={navigation} />
                    </View>
                    <View style={styles.logoWrapper}>
                        <Logo />
                    </View>
                    <View style={styles.container} >
                        <Text style={styles.title}>{localization[language]["Password recovery"]}</Text>
                        <Text style={styles.textDescription}>{localization[language]["Please specify the email you used when registering"]}</Text>
                        <CommonInput
                            keyboardType="email-address"
                            placeholder={localization[language].placeHolder.email}
                            errorText={localization[language].errors.errorEmail}
                            filter={filterEmail}
                            action={setForgotPasswordEmail}
                            isValid={email.isValid}
                            testID="InputEmailForgotPasswordID"
                            textErrorID="EmailErrorRegostrationID"
                            currentLanguageName={language}
                        />
                        <ButtonSubmit
                            text={localization[language].sendBtnText}
                            testID="ButtonSubmitForgotPasswordID"
                            isDisabled={isForgotPasswordDisabled}
                            isShowSpiner={forgotPasswordSpiner}
                            onPress={this.sendForgotPasswordData}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    forgotPasswordData: state.forgotPasswordData,
    forgotPasswordSpiner: state.spiners.forgotPasswordSpiner,
    isConnected: state.connectionStatus.isConnected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setForgotPasswordEmail,
    showForgotPasswordSpiner
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);