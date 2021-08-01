import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PreviousAndroid from './previousAndroid';
import PreviousIOS from './previousIOS';
import { withNavigation } from 'react-navigation';
import Utils from '../../../../api/utils/utils';

const { isIOS } = Utils;

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: '100%',
        justifyContent: 'center',
        paddingLeft: isIOS ? 5 : 20,
        paddingRight: isIOS ? 5 : 20,
        transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : [],
    },
});

export class ButtonBack extends Component {
    constructor(props) {
        super(props);
        this.previousSvg = this.getPreviousSvg();
    }

    goBack = () => {
        const { navigation, userEmail } = this.props;
        const routNames = navigation.dangerouslyGetParent().state.routes;
        const currentRoutName = routNames[routNames.length - 1].routeName;
        if (currentRoutName === 'NotificationsItemDetailsScreen') {
            navigation.navigate('NotificationsScreen');
        } else if (userEmail) {
            navigation.navigate('TabAppNavigator');
        } else {
            navigation.navigate('RegistrationScreen');
        }
    }

    getPreviousSvg = () => {
        let result = <PreviousAndroid width={16} height={16} />;
        if (isIOS) {
            result = <PreviousIOS width={20} height={20} />;
        }
        return result;
    }

    render() {
        const { id } = this.props;
        return (
            <TouchableOpacity onPress={this.goBack} testID={`NotificationButtonBack${id}ID`} accessibilityLabel={`NotificationButtonBack${id}ID`} >
                <View style={styles.container}>
                    {this.previousSvg}
                </View>
            </TouchableOpacity >
        );
    }
}

const mapStateToProps = state => ({
    historyNotification: Object.values(state.historyNotification),
    notificationObj: state.setNotificationObj,
    userEmail: state.userLoginData.userEmail,
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ButtonBack));