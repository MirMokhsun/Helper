import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHA256 } from '../sha256/sha256';
import NotificationApi, { createNotificationObj } from './notification.api';
import { addPushNotification, addPushNotificationHistory } from './redux/addPushNotificationAction';
import Utils from '../utils/utils';
import { writeInAsyncStorage, getFromAsyncStorage } from '../writeInAsyncStorage/writeInAsyncStorage';

export class AppAndroidNotification extends Component {
    constructor(props) {
        super(props)
        this.notificationApi = new NotificationApi();
        this.notificationListener = null;
        this.notificationOpenedListener = null;
    }

    componentDidMount = async () => {
        try {
            await this.setDefaultSettings();
            this.getNotificationFromServer();
            const channelConfig = await this.getChannelConfig();
            firebase.notifications().android.createChannel(channelConfig);
            firebase.messaging().subscribeToTopic('com.umarkets.analyticsforex');
            const enabled = await firebase.messaging().hasPermission();
            if (!enabled) {
                await firebase.messaging().requestPermission();
            }
            // App closed
            this.getInitialNotification();
            // App in foreground
            this.notificationListener = this.setNotificationListener();
            // 	App in background шторка
            this.notificationOpenedListener = this.setNotificationOpenedListener();
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
        if (this.notificationListener) {
            this.notificationListener()
        };
        if (this.notificationOpenedListener) {
            this.notificationOpenedListener();
        }
    }

    getInitialNotification = async () => {
        try {
            const { stackNav, addPushNotification } = this.props;
            const notificationOpen = await firebase.notifications().getInitialNotification();
            if (notificationOpen) {
                const { body, title, msgID, msgTimeSent, bodyType } = notificationOpen.notification._data;
                const notificationObj = createNotificationObj(title, body, parseInt(msgID, 10), msgTimeSent, false, bodyType);
                addPushNotification(notificationObj);
                stackNav.navigate('NotificationsItemDetailsScreen');
            }
        } catch (error) {
            console.warn('getInitialNotification', error);
        }
    }

    setNotificationListener = () => {
        return firebase.notifications().onNotification((notification) => {
            const { body, title, msgID, msgTimeSent, bodyType } = notification._data;
            const localNotification = this.createLocalNotification(notification);
            firebase.notifications().displayNotification(localNotification).catch(err => console.error(err));
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
            const localNotification = this.createLocalNotification(notificationOpen.notification);
            const { body, title, msgID, msgTimeSent, bodyType } = localNotification._data;
            const notificationObj = createNotificationObj(title, body, parseInt(msgID, 10), msgTimeSent, false, bodyType);
            const { stackNav, addPushNotification } = this.props;
            addPushNotification(notificationObj);
            setTimeout(() => {
                firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
            }, 6300);
            stackNav.navigate('NotificationsItemDetailsScreen');
        });
    }

    createLocalNotification = (notification) => {
        const localNotification = new firebase.notifications.Notification({ sound: 'default', show_in_foreground: true, show_in_background: true })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification._data)
            .android.setChannelId('com.wallet.online') // e.g. the id you chose above
            .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
            .android.setLargeIcon('ic_launcher') // create this icon in Android Studio
            .android.setColor('#000000') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
        return localNotification;
    }

    getChannelConfig = async () => {
        try {
            const channelConfig = await new firebase.notifications.Android.Channel(
                'com.umarkets.analyticsforex',
                'Test Channel',
                firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
            return channelConfig;
        } catch (error) {
            console.warn('getChannelConfig', error);
            return null;
        }
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
            if (this.notificationApi.sha256) {
                const arrayNotification = await this.notificationApi.getHistoryNotification(this.notificationApi.sha256);
                if (arrayNotification) {
                    const { addPushNotificationHistory } = this.props;
                    addPushNotificationHistory(Utils.fromJSON(arrayNotification));
                }
            }
        } catch (error) {
            console.warn('getNotificationFromServer', error);
        }
    }

    parseStringToNumber = (str) => {
        let result = 0;
        if (str && (typeof str === 'string')) {
            result = parseInt(str, 10);
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

export default connect(mapStateToProps, mapDispatchToProps)(AppAndroidNotification);