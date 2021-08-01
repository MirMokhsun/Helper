// /* eslint-disable no-return-await */
// import React, { PureComponent } from 'react';
// import { View, Text, AppState, Platform } from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
// import { styles } from './styles';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import store from '../../redux/store/store';
// import { setIsConnected } from './redux/actionSetIsConnected';
// import Varning from './svg/Varning';
// import { countriesru } from '../../common/countries/countries_ru';
// import { getPlatform } from '../../api/setLanguageInStartApp/setLanguageInStartApp';
// import { returnCountriesLocalization } from '../../api/setCountryName/setCountryName';
// import { setRegistrationPhoneCode, setRegistrationCountry } from '../screens/registrationScreen/redux/registrationDataAction';
// import DeviceInfo from 'react-native-device-info';
// import { config } from '../../api/config';

// const ios = getPlatform(Platform.OS);

// export class StatusConnection extends PureComponent {
//     constructor(props) {
//         super(props)

//         this.state = {
//             isFirstConnection: true,
//             isStart: true,
//             appState: AppState.currentState,
//             connectionType: null,
//             connectioneffectiveType: null,
//             unsubscribe: null,
//         }
//     }


//     componentDidMount() {
//         NetInfo.addEventListener(state => {
//             this.handleConnectivityChange(state.isConnected)
//           })
        
//         AppState.addEventListener('change', this._handleAppStateChange);
//     }
    
//     UNSAFE_componentWillUnmount() {
//         // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange());
//         AppState.removeEventListener('change', this._handleAppStateChange);
//     }

//     __callFeach = async (url, method, body) => {
//         try {
//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body,
//             });
//             return await response.json();
//         } catch (error) {
//             console.error('StatusConnection: ', error);
//         }
//     }

//     GetCountryIso = async (url) => {
//         return await this.__callFeach(url, "GET", "");
//     }

//     filterBlockedCounties = (country) => {
//         let result = '';
//         switch (country) {
//             case 'UA':
//                 result = 'RU';
//                 break;
//             case 'PR':
//                 result = 'GB';
//                 break;
//             case 'UY':
//                 result = 'GB';
//                 break;
//             case 'US':
//                 result = 'GB';
//                 break;
//             case 'UM':
//                 result = 'GB';
//                 break;
//             case 'IE':
//                 result = 'GB';
//                 break;
//             case 'IL':
//                 result = 'GB';
//                 break;
//             case 'RO':
//                 result = 'GB';
//                 break;
//             default: result = country;
//         }
//         return result;
//     }

//     setDefaultCountry = async (connect) => {
//         try {
//             const { language, setRegistrationCountry, setRegistrationPhoneCode } = this.props;
//             const deviceLang = DeviceInfo.getDeviceCountry();
//             if (connect) {
//                 const urlUmarkets = config.links.DOMEN + "dictionary/countryiso";
//                 const response = await this.GetCountryIso(urlUmarkets);
//                 const objectsCountry = returnCountriesLocalization(language);
//                 const countryISO = this.filterBlockedCounties(response, deviceLang);
//                 if (countryISO) {
//                     setRegistrationCountry({ isValid: true, value: objectsCountry[countryISO].countryName, countryKey: countryISO });
//                     setRegistrationPhoneCode(countriesru[countryISO].phcode);
//                 }
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     _handleAppStateChange = (nextAppState) => {
//         const { webSocketClient: ws } = this.props;
//         const { appState } = this.state;
//         if (ios && appState.match(/inactive|background/) && nextAppState === 'active') {
//             store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
//             if (ws) {
//                 ws.webSocketClient.closeWebSocketConnection();
//                 ws.webSocketClient.websocket.reconect();
//             }
//         }
//         this.setState({ appState: nextAppState });
//     }

//     handleConnectivityChange = (isConnected) => {
//         const { webSocketClient: ws, setIsConnected } = this.props;
//         const { isFirstConnection } = this.state;

//         setIsConnected(isConnected);
//         if (!isConnected && !isFirstConnection) {
//             store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
//             if (ws) {
//                 ws.webSocketClient.closeWebSocketConnection();
//                 ws.webSocketClient.websocket.reconect();
//             }
//         }
//         if (isFirstConnection && isConnected) {
//             NetInfo.getConnectionInfo().then((connectionInfo) => {
//                 this.setState({
//                     connectionType: connectionInfo.type,
//                     connectioneffectiveType: connectionInfo.effectiveType,
//                 })
//             });
//             // let freeServer = new FreeServer();
//             // freeServer.getFreeServer();
//             this.setState({ isFirstConnection: false });
//             this.setDefaultCountry(isConnected);
//         }
//         this.setState({ isStart: false });

//         this.chackChangingNetSourse();
//     };

//     chackChangingNetSourse = () => {
//         NetInfo.getConnectionInfo().then((connectionInfo) => {
//             const { connectionType, connectioneffectiveType } = this.state;

//             if (connectionType !== connectionInfo.type || connectionInfo.effectiveType !== connectioneffectiveType) {
//                 const { webSocketClient: ws } = this.props;
//                 store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
//                 if (ws) {
//                     ws.webSocketClient.closeWebSocketConnection();
//                     ws.webSocketClient.websocket.reconect();
//                 }
//             }
//             this.setState({
//                 connectionType: connectionInfo.type,
//                 connectioneffectiveType: connectionInfo.effectiveType,
//             })
//         });
//     }

//     render() {
//         const { isConnected } = this.props;
//         const { isStart } = this.state;

//         if (!isConnected && !isStart) {
//             return (
//                 <View style={styles.mainwrapper}>
//                     <Varning />
//                     <Text style={styles.text}>Connecting...</Text>
//                 </View>
//             )
//         }
//         return null;
//     }
// }

// const mapStateToProps = state => ({
//     isConnected: state.connectionStatus.isConnected,
//     connectionStatus: state.connectionStatus.connectionStatus,
//     language: state.currentLanguage.language,
//     webSocketClient: state.webSocketClient.webSocketClient
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//     setIsConnected,
//     setRegistrationCountry,
//     setRegistrationPhoneCode,
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(StatusConnection);