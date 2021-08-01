import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View, StyleSheet } from 'react-native';
import store from './redux/store/store';
import AppsFlyerApi from './api/appsFlyerApi/appsFlyerApi';
import ContentWrapper from './components/commonComponents/contentWrapper/contentWrapper';
import Utils from './api/utils/utils';
import AppIosNotification from './api/notification.api/App.notification.ios';
import AppAndroidNotification from './api/notification.api/App.notification.android';
import { InitConfig } from './api/initConfig';

const { isIOS } = Utils;

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.AppsFlyerApi = new AppsFlyerApi();
    this.state = {
      loaded: false,
    }
  }

  componentDidMount = async () => {
    await InitConfig();
    this.setState({ loaded: true });
    this.AppsFlyerApi.onInstallConversionDataCanceller();
    this.AppsFlyerApi.initSdk();
    this.AppsFlyerApi.getAppsFlyerUID();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.wrapper}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5F5F7" />
          {
            this.state.loaded ?
              <>
                <ContentWrapper />
                {isIOS ? <AppIosNotification /> : <AppAndroidNotification />}
              </> : null
          }
        </View>
      </Provider>
    );
  }
}

export default App;