/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Linking, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rest from '../../../commonComponents/svg/Rest';
import { CatalogAndOtherButton } from '../../../commonComponents/catalogAndOtherButton/catalogAndOtherButton';
import PhoneSVG from '../../../commonComponents/svg/phoneSVG';
import MobilePhoneSVG from '../../../commonComponents/svg/mobilePhoneSVG';
import AtSVG from '../../../commonComponents/svg/atSVG';
import BellSVG from '../../../commonComponents/svg/bellSVG';
import PlanetSVG from '../../../commonComponents/svg/planetSVG';
import ExitSVG from '../../../commonComponents/svg/exitSVG';
import { withNavigation } from 'react-navigation';
import { styles } from './style';
import { localization } from '../../../../common/localization';
import { showPopUp } from '../../../commonComponents/contentWrapper/redux/showPopUpAction';
import { crmRegistration } from '../../../../api/registration/registrationSingleton';
import { isUndefinedReturnSecondParam } from '../../../../api/isUndefinedReturnSecondParam/isundefinedreturnsecondparam';
import NotificationApi from '../../../../api/notification.api/notification.api';
import { isEqual } from 'lodash';
import { getUrl } from '../../../../api/getUrlForLinkTraidingApp/getUrlForLinkTraidingApp';
import Utils from '../../../../api/utils/utils';

const { isIOS } = Utils;


export class RestScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: isUndefinedReturnSecondParam(navigation.state.params, 'pageTitle', 'Rest'),
    tabBarIcon: ({ focused }) => {
      const { countNotification } = navigation.state.params || 0;
      let result = null;
      if (countNotification && focused) {
        result = <Image source={require("../../../commonComponents/images/fosucWithNotific.jpg")} resizeMode="stretch" style={styles.imageSize} />;
      }
      else if (countNotification && !focused) {
        result = <Image source={require("../../../commonComponents/images/notFosucWithNotific.jpg")} resizeMode="stretch" style={styles.imageSize} />;
      }
      else if (focused) {
        result = <Rest color="#1459D2" />;
      } else if (!focused) {
        result = <Rest color="#000756" />;
      }
      return result;
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      countNotReadNotification: 0
    }
    this.notificationApi = new NotificationApi();
  };

  componentDidMount = async () => {
    const { historyNotification, navigation, language } = this.props;
    this.setBadgeCounterNotification(historyNotification);
    navigation.setParams({ pageTitle: localization[language].Other });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { historyNotification } = nextProps;
    this.setBadgeCounterNotification(historyNotification);
  };

  componentDidUpdate(prevProps) {
    const { language, navigation } = this.props;
    const { language: prevLanguage } = prevProps;
    if (language !== prevLanguage) {
      navigation.setParams({ pageTitle: localization[language].Other });
    }
  };

  openOurWebsite = () => {
    Linking.openURL('https://www.umarkets.ai/');
  };

  goToSelectLanguageScreen = () => {
    const { navigation, language } = this.props;
    navigation.navigate("SelectLanguageScreen", { title: localization[language].LanguagePreference });
  };

  goToOurApps = () => {
    const { language } = this.props;
    const url = getUrl(language, isIOS);
    Linking.openURL(url);
  }

  goToNotificationsScreen = () => {
    const { navigation, language } = this.props;
    navigation.navigate("NotificationsScreen", { title: localization[language].notifications });
  };

  showPopUp = () => {
    const { showPopUp, navigation } = this.props;
    const popUpName = 'exit';
    showPopUp(popUpName, navigation);
  };

  connectWithMeneger = async () => {
    const { userEmail } = this.props;
    await crmRegistration.contactWithBroker(userEmail);
  };

  setBadgeCounterNotification = (arrayNotification) => {
    const countNotification = this.notificationApi.getCountReadNotification(arrayNotification);
    this.setStateBadgeCounterNotification(countNotification);
  };

  setStateBadgeCounterNotification = (countNotification) => {
    const { countNotReadNotification } = this.state;
    if (!isEqual(countNotReadNotification, countNotification)) {
      this.setState({ countNotReadNotification: countNotification });
      const { navigation } = this.props;
      navigation.setParams({ countNotification });
    }
  };

  render() {
    const { language, userEmail } = this.props;
    const { countNotReadNotification } = this.state;
    const currentLanguage = localization[language];
    return (
      <View style={styles.container}>
        <View style={styles.flex4}>
          <View style={styles.rowWith2Buttons}>
            <CatalogAndOtherButton id="ContactBroker" title={currentLanguage.ContactBroker} svg={<PhoneSVG />} color="#F86F6F" onPress={this.connectWithMeneger} />
            <CatalogAndOtherButton id="OurApps" title={currentLanguage.OurApps} svg={<MobilePhoneSVG />} color="#219653" onPress={this.goToOurApps} />
          </View>
          <View style={styles.rowWith2Buttons}>
            <CatalogAndOtherButton id="OurWebsite" title={currentLanguage.OurWebsite} svg={<AtSVG />} color="#1459D2" onPress={this.openOurWebsite} />
            <CatalogAndOtherButton id="notifications" title={currentLanguage.notifications} svg={<BellSVG />} color="#F2C94C" onPress={this.goToNotificationsScreen} notifications={countNotReadNotification} />
          </View>
          <View style={styles.rowWith2Buttons}>
            <CatalogAndOtherButton id="LanguagePreference" title={currentLanguage.LanguagePreference} svg={<PlanetSVG />} color="#F2994A" onPress={this.goToSelectLanguageScreen} />
            <CatalogAndOtherButton id="exit" title={currentLanguage.exit} svg={<ExitSVG />} color="#BB6BD9" text={currentLanguage.YouLoggedAs + userEmail} onPress={this.showPopUp} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  historyNotification: Object.values(state.historyNotification),
  language: state.currentLanguage.language,
  userEmail: state.userLoginData.userEmail,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showPopUp,
}, dispatch);

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RestScreen));



