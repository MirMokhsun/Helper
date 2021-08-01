/* eslint-disable no-restricted-syntax, consistent-return, react/no-unused-state, react/jsx-curly-brace-presence,no-sequences, eqeqeq, dot-notation  */
import React, { Component } from 'react';
import { View, Platform, Text, BackHandler, I18nManager, ScrollView } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Utils from '../../../api/utils/utils';
import { isEqual } from 'lodash';
import ButtonBack from './buttonBack/buttonBack';
import NotificationApi from '../../../api/notification.api/notification.api';
import { addPushNotificationHistory } from '../../../api/notification.api/redux/addPushNotificationAction';
import store from '../../../redux/store/store';
import FormBtnSubmit from '../../commonComponents/buttonSubmit/buttonSubmit';
import { crmRegistration } from '../../../api/registration/registrationSingleton';
import { showRegistrationSpiner } from "../../commonComponents/buttonSubmit/redux/spinersAction";
import { localization } from '../../../common/localization';

export class NotificationsItemDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#000756',
        headerBackTitle: null,
        title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'Notification' : 'Notification',
        headerTitleStyle: {
            color: "#000756",
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            textAlign: "center",
            fontSize: 20,
            lineHeight: 40,
            ...Platform.select({
                ios: {
                    paddingRight: 0,
                },
                android: {
                    paddingRight: I18nManager.isRTL ? 0 : 30,
                    paddingLeft: I18nManager.isRTL ? 30 : 0,
                },
            }),
            fontFamily: 'Roboto',
            backgroundColor: "#ffffff",
        },
        headerStyle: {
            backgroundColor: "#ffffff",
            borderBottomColor: "#ffffff",
            ...Platform.select({
                ios: {
                    marginTop: this.isIphoneX ? 25 : 10,
                    paddingTop: 20,
                },
                android: {
                    marginTop: 0,
                    paddingTop: 10,
                },
            }),
        },
        headerRight: (<View />),
        headerLeft: (<ButtonBack id="NotificationsItemDetailsID" nav={navigation} />),
    });

    constructor(props) {
        super(props)
        this.isIphoneX = Utils.isIphoneX;
        const { WasRead } = props;
        this.state = {
            notObj: {
                msgID: 1,
                MsgText: "",
                msgTimeSent: 1,
                msgTimeExpiration: 0,
                title: "",
                body: "",
                bodyType: false,
                wasRead: false
            },
            WasRead,
        }
        this.notificationApi = new NotificationApi();
    }

    componentDidMount = async () => {
        try {
            const { notificationObj, notificationObj:{wasRead, msgID}, historyNotification, addPushNotificationHistory } = this.props;
            if (!wasRead) {
                this.notificationApi.setWasReadNotification(this.notificationApi.sha256, msgID);
                this.setReadNotification(historyNotification, msgID, addPushNotificationHistory);
            } else {
                this.checkTimOutNot();
            }
            this.setState({ notObj: notificationObj });
            BackHandler.addEventListener('hardwareBackAuthorizationScreen', this.hardwareBackAuthorizationScreen);
        } catch (error) {
            console.warn(error);
        }
    }

    UNSAFE_componentWillReceiveProps = async (nextProps) => {
        try {
            const { notObj } = this.state;
            const { notificationObj, historyNotification } = nextProps;
            const { msgID } = notificationObj;
            const isEqualObj = isEqual(notObj, notificationObj)
            if (!isEqualObj) {
                await this.notificationApi.setWasReadNotification(this.notificationApi.sha256, msgID);
                this.setReadNotification(historyNotification, msgID, addPushNotificationHistory);
            }
            notificationObj.wasRead = true;
            this.setState({ notObj: notificationObj });
        } catch (error) {
            console.warn(error);
        }
    }

    UNSAFE_componentWillUnmount = async () => {
        BackHandler.removeEventListener('hardwareBackAuthorizationScreen', this.hardwareBackAuthorizationScreen);
    }

    setReadNotification = (arrayNotification, msgID, addPushNotificationHistory) => {
        if (arrayNotification, msgID) {
            for (const notification of arrayNotification) {
                if (notification.msgID === msgID) {
                    notification.wasRead = true;
                    break;
                }
            }
            store.dispatch(addPushNotificationHistory(arrayNotification));
        }
    }

    checkTimOutNot = async () => {
        try {
            setTimeout(() => {
                const { notificationObj, historyNotification, addPushNotificationHistory } = this.props;
                this.setReadNotification(historyNotification, notificationObj.msgID, addPushNotificationHistory);
            }, 3000);
        } catch (error) {
            console.warn(error);
        }
    }

    hardwareBackAuthorizationScreen = () => {
        const { navigation, userEmail, language } = this.props;
        const routNames = navigation.dangerouslyGetParent().state.routes;
        const currentRoutName = routNames[routNames.length - 1].routeName;
        if (currentRoutName === 'NotificationsItemDetailsScreen') {
            navigation.navigate('NotificationsScreen', { title: localization[language]["notifications"] });
        } else if (userEmail) {
            navigation.navigate('TabAppNavigator');
        } else {
            navigation.navigate('RegistrationScreen');
        }
        return true;
    }

    connectWithMeneger = () => {
        const { userEmail, showRegistrationSpiner } = this.props;
        crmRegistration.contactWithBroker(userEmail);
        showRegistrationSpiner();
    };

    render() {
        const { notObj: { title, body, bodyType } } = this.state;
        const { language, spinerVisibility, isConnected } = this.props;
        return (
            <View style={styles.pagerWrapper}>
                <ScrollView   >
                    <View style={styles.notificationContainer}>
                        <Text style={styles.textTitleDescription} numberOfLines={3} >{title}</Text>
                        <Text style={styles.textDescription}> {body}</Text>
                    </View>
                    {bodyType === "SALES_NOTIFY" ? <View style={styles.btnOffer}>
                        <FormBtnSubmit
                            text={localization[language]['recvOffers']}
                            isEnable={isConnected}
                            showSpiner={spinerVisibility}
                            testID="FormBtnSubmitconnectWithMenegerID"
                            onPress={this.connectWithMeneger}
                        />
                    </View> : <View />}
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    historyNotification: Object.values(state.historyNotification),
    notificationObj: state.setNotificationObj,
    userEmail: state.userLoginData.userEmail,
    language: state.currentLanguage.language,
    spinerVisibility: state.spiners.registrationSpiner,
    isConnected: state.connectionStatus.isConnected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPushNotificationHistory,
    showRegistrationSpiner
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsItemDetailsScreen);