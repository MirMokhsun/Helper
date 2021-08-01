import React from 'react';
import { View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { bindActionCreators } from 'redux';
import StatusConnection from '../../recconect/statusConnection';
import { Popup } from '../popUP/popUp';
import { hidePopUp, hideToast } from './redux/showPopUpAction';
import { localization } from '../../../common/localization';
import { ThanksTextAndSVG } from './contentWrapperElements/thanksTextAndSVG';
import { setUserData } from '../../screens/authorizationScreen/reducer/userLoginAction';
import { writeInAsyncStorage } from '../../../api/writeInAsyncStorage/writeInAsyncStorage';
import { Toast } from '../toast/toast';
import { RateAppPopUp } from '../rateAppPopUp/rateAppPopUp';
import {
    setRegistrationCheckbox,
    setRegistrationPhone,
    setRegistrationCountry,
    setRegistrationEmail,
    setRegistrationFirstName,
    setRegistrationLastName
} from '../../screens/registrationScreen/redux/registrationDataAction';
import SwitchNavigator from '../../navigators/switchNavigator';

export class ContentWrapper extends React.Component {
    constructor(props) {
        super(props);
        const { language } = props;
        const currentLanguage = localization[language];
        this.state = {
            currentPopup: <Popup
                width="60%"
                title="Hello"
                backgroundFunction={this.hidePopUp}
                textBtn={currentLanguage.OK}
                functionBtn={this.hidePopUp}
            />,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { name, language, errorText } = nextProps;
        const currentLanguage = localization[language];
        let result = null;
        switch (name) {
            case 'exit':
                result =
                    (<Popup
                        width="90%"
                        title={currentLanguage['Are you sure you want to log out?']}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.No}
                        functionBtn={this.hidePopUp}
                        textBtnWhite={currentLanguage.Yes}
                        functionBtnWhite={this.exitPopUpFunc}
                    />)
                break;
            case 'connectMeneger':
                result =
                    (<Popup
                        topComponent={<ThanksTextAndSVG text={currentLanguage.thanks} />}
                        width="60%"
                        title={currentLanguage.ManagerWillContact}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.hidePopUp}
                    />)
                break;
            case 'registrationError':
                result =
                    (<Popup
                        width="60%"
                        topComponent={<Text style={styles.errorText}>{currentLanguage["error!"]}</Text>}
                        title={errorText}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.hidePopUp}
                    />)
                break;
            case 'authorizationError':
                result =
                    (<Popup
                        width="60%"
                        topComponent={<Text style={styles.errorText}>{currentLanguage["error!"]}</Text>}
                        title={errorText}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.hidePopUp}
                    />)
                break;
            case 'forgotPasswordError':
                result =
                    (<Popup
                        width="60%"
                        topComponent={<Text style={styles.errorText}>{currentLanguage["error!"]}</Text>}
                        title={errorText}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.hidePopUp}
                    />)
                break;
            case 'forgotPasswordSuccessful':
                result =
                    (<Popup
                        topComponent={<ThanksTextAndSVG />}
                        width="60%"
                        title={currentLanguage["Instructions for password recovery..."]}
                        backgroundFunction={this.hidePopUp}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.forgotPasswordPopup}
                    />)
                break;
            case 'registrationPopUp':
                result =
                    (<Popup
                        width="60%"
                        title={currentLanguage.regPopUp}
                        backgroundFunction={this.fihishRegistration}
                        textBtn={currentLanguage.OK}
                        functionBtn={this.fihishRegistration}
                    />)
                break;
            default:
                result = null;
        }
        this.setState({ currentPopup: result });
    }

    forgotPasswordPopup = () => {
        const {  navigation } = this.props;
        this.hidePopUp();
        navigation.navigate('AuthorizationScreen');
    }

    hidePopUp = () => {
        const { hidePopUp } = this.props;
        hidePopUp();
    }

    exitPopUpFunc = () => {
        try {
            const { setUserData, navigation } = this.props;
            setUserData('');
            writeInAsyncStorage('@userData:key', '');
            navigation.navigate('RegistrationScreen');
            this.hidePopUp();
        } catch (error) {

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
        setRegistrationEmail({ isValid: true, value: null });
        setRegistrationFirstName({ isValid: true, value: null });
        setRegistrationLastName({ isValid: true, value: null });
        setRegistrationPhone({ isValid: true, value: null });
        if (registrationData.agreementCheckbox.isValid) {
            setRegistrationCheckbox();
        }
    }


    fihishRegistration = async () => {
        try {
            const { hidePopUp, navigation } = this.props;
            navigation.navigate('TabAppNavigator');
            await hidePopUp();
            await this.clearRegistrationFields();
        } catch (error) {

        }
    }

    render() {
        const { isVisible, toastText, isVisibleToast, language } = this.props;
        const { currentPopup } = this.state;
        const currentLanguage = localization[language];
        return (
            <View style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
                <Modal
                    visible={isVisible}
                    animationType="fade"
                    transparent
                    onRequestClose={this.hidePopUp}
                >
                    {currentPopup}
                </Modal>
                <RateAppPopUp {...{ CurrentLanguage: currentLanguage }} />
                <Toast {...{ toastText, isVisibleToast, hideToast }} />
                <SwitchNavigator />
                <StatusConnection />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isVisible: state.popUpVisibility.isVisible,
    name: state.popUpVisibility.name,
    toastText: state.popUpVisibility.toastText,
    isVisibleToast: state.popUpVisibility.isVisibleToast,
    language: state.currentLanguage.language,
    errorText: state.errorText.text,
    registrationData: state.registrationData,
    navigation: state.stackNavigator.navigator
});

const mapDispatchToProps = dispatch => bindActionCreators({
    hidePopUp,
    hideToast,
    setUserData,
    setRegistrationCheckbox,
    setRegistrationPhone,
    setRegistrationCountry,
    setRegistrationEmail,
    setRegistrationFirstName,
    setRegistrationLastName,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);