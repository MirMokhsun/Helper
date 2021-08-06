import React, { Component } from 'react';
import firebase from '@react-native-firebase/app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHA256 } from '../sha256/sha256';
import NotificationApi, { createNotificationObj } from './notification.api';
import { addPushNotification, addPushNotificationHistory } from './redux/addPushNotificationAction';
import store from '../../redux/store/store';
import Utils from '../utils/utils';
import { getFromAsyncStorage, writeInAsyncStorage } from '../writeInAsyncStorage/writeInAsyncStorage';

export class AppIosNotification extends Component {
    constructor(props) {
        super(props)
        this.notificationApi = new NotificationApi();
        this.notificationListener = null;
        this.notificationOpenedListener = null;
        this.notificationDisplayedListener = null;
    }

    componentDidMount = async () => {
        try {
            const enabled = await firebase.messaging().hasPermission();
            if (!enabled) {
                try {
                    await firebase.messaging().requestPermission();
                    // User has authorised
                } catch (error) {
                    // User has rejected permissions
                }
            }
            this.getInitialNotification();
            this.notificationListener = this.setNotificationListener();
            this.notificationOpenedListener = this.setNotificationOpenedListener();
            this.notificationDisplayedListener = this.setNotificationDisplayedListener();
        } catch (error) {
            console.warn(error);
        }
    }

    componentDidUpdate = async (prevProps) => {
        try {
            const { email } = this.props;
            if (prevProps.email !== email) {
                await this.setDefaultSettings();
                this.getNotificationFromServer();
            }
        } catch (error) {
            console.warn(error);
        }
    }

    UNSAFE_componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    getInitialNotification = async () => {
        try {
            const notificationOpen = await firebase.notifications().getInitialNotification();
            if (notificationOpen) {
                const { addPushNotification, stackNav } = this.props;
                const { body, title, msgID, msgTimeSent, bodyType } = notificationOpen.notification._data;
                const notificationObj = createNotificationObj(title, body, parseInt(msgID, 10), msgTimeSent, false, bodyType);
                store.dispatch(addPushNotification(notificationObj));
                stackNav.navigate('NotificationsItemDetailsScreen');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    setNotificationListener = () => {
        return firebase.notifications().onNotification((notification) => {
            const { body, title, msgID, msgTimeSent, bodyType, } = notification._data;
            const localNotification = new firebase.notifications.Notification()
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .ios.setBadge(notification.ios.badge);
            firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));

            const notificationObj = createNotificationObj(title, body, parseInt(msgID, 10), msgTimeSent, false, bodyType);
            const { historyNotification, addPushNotificationHistory } = this.props;
            const newHistoryNot = this.notificationApi.addNewNotification(notificationObj, historyNotification);
            setTimeout(() => {
                firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
            }, 6300);
            addPushNotificationHistory(newHistoryNot);
        });
    }

    setNotificationOpenedListener = () => {
        return firebase.notifications().onNotificationOpened((notificationOpen) => {
            const localNotification = new firebase.notifications.Notification({ sound: 'default', show_in_foreground: true, show_in_background: true })
                .setNotificationId(notificationOpen.notification.notificationId)
                .setTitle(notificationOpen.notification.title)
                .setSubtitle(notificationOpen.notification.subtitle)
                .setBody(notificationOpen.notification.body)
                .setData(notificationOpen.notification.data);
            const { body, title, msgID, msgTimeSent, bodyType, } = localNotification._data;
            const notificationObj = createNotificationObj(title, body, parseInt(msgID, 10), msgTimeSent, false, bodyType);
            const { stackNav, addPushNotification } = this.props;
            store.dispatch(addPushNotification(notificationObj));
            setTimeout(() => {
                firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
            }, 6300);
            stackNav.navigate('NotificationsItemDetailsScreen');
        });
    }

    setNotificationDisplayedListener = () => {
        return firebase.notifications().onNotificationDisplayed((notification) => {
            firebase.notifications().getBadge().then(count => {
                firebase.notifications().setBadge(count)
            }).then(() => { console.warn('Doing great'); }).catch(error => { console.warn('fail to count'); })
        });
    }

    setDefaultSettings = async () => {
        try {
            const { email, language } = this.props;
            if (email) {
                this.notificationApi.token = await firebase.messaging().getToken();
                this.notificationApi.sha256 = SHA256(email);
                this.notificationApi.email = email;
                const firebaseDataString = await getFromAsyncStorage('firebaseData');
                const firebaseData = firebaseDataString ? JSON.parse(firebaseDataString) : {};
                if (this.notificationApi.token !== firebaseData.token || this.notificationApi.sha256 !== firebaseData.sha256Email) {
                    const responce = await this.notificationApi.setFireBaseSettings(this.notificationApi.token, this.notificationApi.sha256, language);
                    if (responce) {
                        await writeInAsyncStorage('firebaseData', JSON.stringify({ token: this.notificationApi.token, sha256Email: this.notificationApi.sha256 }));
                    }
                }
            }
        } catch (error) {
            console.warn('setDefaultSettings', error)
        }
    }

    getNotificationFromServer = async () => {
        try {
            if (this.notificationApi.sha256 && this.notificationApi.token) {
                try {
                    const arrayNotification = await this.notificationApi.getHistoryNotification(this.notificationApi.sha256);
                    if (arrayNotification) {
                        const { addPushNotificationHistory } = this.props;
                        addPushNotificationHistory(Utils.fromJSON(arrayNotification));
                    }
                } catch (error) {
                    console.warn(error);
                }
            }
        } catch (error) {
            console.warn(error);
        }
    }

    parseStringToNumber = (str) => {
        let result = 0;
        if (str && (typeof str === 'string')) {
            result = parseInt(str,10);
        }
        return result;
    }

    render() {
        return null;
    }
}
const mapStateToProps = state => ({
    historyNotification: Object.values(state.historyNotification),
    stackNav: state.stackNavigator.navigator,
    email: state.userLoginData.userEmail,
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPushNotificationHistory,
    addPushNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppIosNotification);

