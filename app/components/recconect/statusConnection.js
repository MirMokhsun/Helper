/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import { View, Text, AppState, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../../redux/store/store';
import { setIsConnected } from './redux/actionSetIsConnected';
import Varning from './svg/Varning';
import { countriesru } from '../../common/countries/countries_ru';
import { getPlatform } from '../../api/setLanguageInStartApp/setLanguageInStartApp';
import { returnCountriesLocalization } from '../../api/setCountryName/setCountryName';
import { setRegistrationPhoneCode, setRegistrationCountry } from '../screens/registrationScreen/redux/registrationDataAction';
import { config } from '../../api/config';
import FreeServer from '../../api/processingWithServer/getfreesrver';
import * as RNLocalize from "react-native-localize";

const ios = getPlatform(Platform.OS);

const StatusConnection=(props)=> {

    const [isFirstConnection, setIsFirstConnection] = useState(true)
    const [isStart, setIsStart] = useState(true)
    const [isConnected, setIsConnected] = useState(true)
    let appState = AppState.currentState
    const freeServer = new FreeServer();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            handleConnectivityChange(state.isConnected)
            setIsConnected(state.isConnected);
        });
            AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            unsubscribe();
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, [isConnected])

    const __callFeach = async (url, method, body) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            });
            return await response.json();
        } catch (error) {
            console.error('StatusConnection: ', error);
        }
    }

    const GetCountryIso = async (url) => {
        return await __callFeach(url, "GET", "");
    }

    const filterBlockedCounties = (country) => {
        let result = '';
        switch (country) {
            case 'UA':
                result = 'RU';
                break;
            case 'PR':
                result = 'GB';
                break;
            case 'UY':
                result = 'GB';
                break;
            case 'US':
                result = 'GB';
                break;
            case 'UM':
                result = 'GB';
                break;
            case 'IE':
                result = 'GB';
                break;
            case 'IL':
                result = 'GB';
                break;
            case 'RO':
                result = 'GB';
                break;
            default: result = country;
        }
        return result;
    }

    const setDefaultCountry = async (connect) => {
        try {
            const { language, setRegistrationCountry, setRegistrationPhoneCode } = props;
            const deviceLang = RNLocalize.getLocales();
            if (connect) {
                const urlUmarkets = config.links.DOMEN + "dictionary/countryiso";
                const response = await GetCountryIso(urlUmarkets);
                const objectsCountry = returnCountriesLocalization(language);
                const countryISO = filterBlockedCounties(response, deviceLang.countryCode);
                if (countryISO) {
                    setRegistrationCountry({ isValid: true, value: objectsCountry[countryISO].countryName, countryKey: countryISO });
                    setRegistrationPhoneCode(countriesru[countryISO].phcode);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const _handleAppStateChange = (nextAppState) => {
        if (ios && appState.match(/inactive|background/) && nextAppState === 'active') {
            store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
            if (ws) {
                ws.webSocketClient.closeWebSocketConnection();
                ws.webSocketClient.websocket.reconect();
            }
        }
        return appState = nextAppState;
    }

    const handleConnectivityChange = (isConnected) => {
        const { webSocketClient: ws, setIsConnected } = props;

        setIsConnected(isConnected);
        if (!isConnected && !isFirstConnection) {
            store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
            if (ws) {
                ws.webSocketClient.closeWebSocketConnection();
                ws.webSocketClient.websocket.reconect();
            }
        }
        if (isFirstConnection && isConnected) {
            freeServer.getFreeServer();
            setIsFirstConnection(false);
            setDefaultCountry(isConnected);
        }
        setIsStart(false);
        chackChangingNetSourse();
    };

    const chackChangingNetSourse = () => {
        const { webSocketClient: ws } = props;
            store.dispatch({ type: 'SET_CONNECTION_STATUS', data: "Lost Connection" })
                if (ws) {
                    ws.webSocketClient.closeWebSocketConnection();
                    ws.webSocketClient.websocket.reconect();
                }
    }
    
    if (!isConnected && !isStart) {
        return (
            <View style={styles.mainwrapper}>
                <Varning />
                <Text style={styles.text}>Connecting...</Text>
            </View>
        )
    }
    return null;
}

const mapStateToProps = (state) => ({
    isConnected: state.connectionStatus.isConnected,
    connectionStatus: state.connectionStatus.connectionStatus,
    language: state.currentLanguage.language,
    webSocketClient: state.webSocketClient.webSocketClient
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsConnected,
    setRegistrationCountry,
    setRegistrationPhoneCode,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (StatusConnection);