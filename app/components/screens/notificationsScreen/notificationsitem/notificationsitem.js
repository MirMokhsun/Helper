import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import NotificationApi from '../../../../api/notification.api/notification.api';
import { addPushNotification } from '../../../../api/notification.api/redux/addPushNotificationAction';


export class NotificationsItem extends PureComponent {
    constructor(props) {
        super(props)
        this.notificationApi = new NotificationApi();
    }

    openNotificationsItemScreen = () => {
        const { navigation, addPushNotification, notification } = this.props;
        addPushNotification(notification);
        navigation.navigate('NotificationsItemDetailsScreen', notification);
    };

    render() {
        const { textDate, title, wasRead } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.openNotificationsItemScreen} testID='NotificationsItemDetailsScreenID' accessibilityLabel='NotificationsItemDetailsScreenID'>
                <View style={[styles.container, styles.containerBackgroundLight]}>
                    <View style={styles.dataContainer}>
                        <View >
                            <Text style={styles.textDate}>{textDate}</Text>
                        </View>
                        <View style={styles.circleContainer} >
                            {wasRead ? <View /> : <View style={styles.circle} />}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textDescription} numberOfLines={3} >{title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addPushNotification,
}, dispatch);

export default withNavigation(connect(null, mapDispatchToProps)(NotificationsItem));