/* eslint-disable no-nested-ternary,  arrow-body-style, react/sort-comp, react/no-array-index-key, dot-notation  */
import React, { Component } from 'react';
import { View, ScrollView, Platform, I18nManager } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationsItem from './notificationsitem/notificationsitem';
import ApiForNews from '../../../api/processingNews/processingForNews';
import { localization } from '../../../common/localization';
import Utils from '../../../api/utils/utils';
import NotificationApi from '../../../api/notification.api/notification.api';
import { addPushNotificationHistory } from '../../../api/notification.api/redux/addPushNotificationAction';
import { EmptyNotification } from './emptyNotification/emptyNotification';
import ButtonBack from '../notificationItemDetailsScreen/buttonBack/buttonBack';

export class NotificationsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitle: null,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'Notifications' : 'Notifications',
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
                        paddingTop: 20,
                    },
                    android: {
                        marginTop: 0,
                        paddingTop: 10,
                    },
                }),
            },
            headerRight: (<View />),
            headerLeft: (<ButtonBack id="NotificationsItemsID" nav={navigation} />),
        }
    };

    constructor(props) {
        super(props)
        this.newsObj = new ApiForNews();
        this.notificationApi = new NotificationApi();
        this.isIphoneX = Utils.isIphoneX;
        this.state = {
            notifications: [],
        }
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ title: localization[language]["notifications"] });
    }

    componentDidMount() {
        const { historyNotification, language } = this.props;
        const notifications = this.renderNotificationsItems(historyNotification, language);
        this.setState({ notifications });
    }

    UNSAFE_componentWillReceiveProps({ historyNotification, language }, nextState) {
        const notifications = this.renderNotificationsItems(historyNotification, language);
        this.setState({ notifications });
    }

    renderNotificationsItems = (arrayNotification, language) => {
        let pushNotifications = [];
        if (arrayNotification) {
            pushNotifications = arrayNotification.map((notification, index) => {
                const { msgTimeSent, title } = notification;
                const date = this.newsObj.selectLocationData(language, msgTimeSent, true);
                return <NotificationsItem
                    notification={notification}
                    title={title}
                    key={index}
                    textDate={date}
                    wasRead={notification.wasRead}
                />
            });
        }
        return pushNotifications;
    }

    sortCardFunc = (item1, item2) => {
        let result = 0;
        if (item1.key > item2.key) {
            result = - 1;
        } else if (item1.key < item2.key) {
            result = 1;
        }
        return result;
    }

    render() {
        const { notifications } = this.state;
        const { language } = this.props;
        return (
            <View style={styles.container}>
                {(notifications.length > 0) ? <ScrollView contentContainerStyle={styles.scrollView}>
                    {notifications}
                </ScrollView>
                    : <EmptyNotification text={localization[language]['noMessage']} />}
            </View>
        );
    }
};

const mapStateToProps = state => ({
    historyNotification: Object.values(state.historyNotification),
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPushNotificationHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);