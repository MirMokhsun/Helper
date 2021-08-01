/* eslint-disable arrow-body-style, no-restricted-syntax, guard-for-in  */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Animated, StatusBar } from 'react-native';
import { styles } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserData } from '../authorizationScreen/reducer/userLoginAction';
import { setCurrentLanguage } from '../selectLanguageScreen/redux/currentLanguageAction';
import Group from './images/Group';
import Utils from '../../../api/utils/utils';
import { setLanguageInStartApp } from '../../../api/setLanguageInStartApp/setLanguageInStartApp';
import { setStackNavigator } from './redux/stackNavigatorAction';


export class SplashScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    }
  }

  componentWillMount() {
    this.loadHomeScreenSettings();
  }

  componentDidMount() {
    const { setStackNavigator, navigation } = this.props;
    setStackNavigator(navigation);
    this.animation();
  }

  animation = () => {
    const { opacity } = this.state;
    opacity.setValue(0)
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }
    ).start(() => {
      const { userEmail, navigation } = this.props;
      if (userEmail && navigation.isFocused()) {
        navigation.navigate('TabAppNavigator');
      } else if (navigation.isFocused()) {
        navigation.navigate('RegistrationScreen');
      }
    });
  }

  loadHomeScreenSettings = async () => {
    try {
      const { setUserData, setCurrentLanguage } = this.props;
      const getDataFromAsyncStorage = await AsyncStorage.multiGet([
        '@userData:key',
        '@language:key',
      ]);
      for (const key in getDataFromAsyncStorage) {
        const keyName = getDataFromAsyncStorage[key][0];
        if (getDataFromAsyncStorage[key][1]) {
          switch (keyName) {
            case '@userData:key':
              setUserData(getDataFromAsyncStorage[key][1]);
              break;
            case '@language:key':
              setCurrentLanguage(getDataFromAsyncStorage[key][1]);
              break;
            default:
              /* code */
              break;
          }
        }
      }
      if (!getDataFromAsyncStorage[1][1]) {
        setLanguageInStartApp(Utils.isIOS, setCurrentLanguage);
      }
    } catch (error) {
      console.warn('loadHomeScreenSettings', error);
    }
  }

  render() {
    const { opacity } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000756" />
        <Animated.View style={{ opacity }}>
          <Group />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.userLoginData.userEmail,
  isNotificationOpen: state.notificationDataOpen.isNotOpen
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setUserData,
  setCurrentLanguage,
  setStackNavigator,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);