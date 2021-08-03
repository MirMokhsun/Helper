/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */
import { getPlatform } from "../setLanguageInStartApp/setLanguageInStartApp";
import appsFlyer from 'react-native-appsflyer';
import { Platform } from 'react-native';
import store from '../../redux/store/store';

const options = {
    devKey: "Rode4JySsa72easFEcoUUk",
    isDebug: false
};

if (Platform.OS === 'ios') {
    options.appId = "1449568979";
    if(parseInt(Platform.Version, 10)>= 15)
    {
        otpions.timeToWaitForATTUserAuthorization= 10;
    }
};

export default class AppsFlyerApi {
    constructor() {
        this._organicInstallAndroid = "oth_droid_FXHelper_organic_";
        this._organicInstallIos = "oth_ios_FXHelper_organic_";
        this._isPlatformIOS = getPlatform(Platform.OS);
    }

    makeAppsFlyerInfo = (appsflayerData, language) => {
        let appsFlyerInfo = "";
        let existLinkId = false;

        if (appsflayerData) {
            if (appsflayerData['media_source'] && appsflayerData['media_source'] === 'mail.ru_int') { // check if MyTargets
                appsFlyerInfo = this.getDataForMyTargets(appsflayerData);
            } else if (appsflayerData['campaign'] &&
                ((appsflayerData['campaign'].indexOf('media-appsflyer') !== -1) ||
                    (appsflayerData['campaign'].indexOf('test-hammer-appsf') !== -1))) {
                appsFlyerInfo = this.getDataForAMS(appsflayerData); // get info for AppsFlyer
            } else {
                appsFlyerInfo = this.getDataForAppsFlyer(appsflayerData); // get info for AppsFlyer
            }
        }

        if (appsflayerData['campaign']) {
            existLinkId = true;
        }
        const { getAppsFlyerUID } = store.getState().appsFlyerData;

        if (getAppsFlyerUID) {
            appsFlyerInfo += `&model.addata=${getAppsFlyerUID}`;
        }

        // if none organic, add organicInstall
        if (!existLinkId) {
            if (this._isPlatformIOS) {
                appsFlyerInfo += `&model.linkId=${this._organicInstallIos}${language}`;
            } else {
                appsFlyerInfo += `&model.linkId=${this._organicInstallAndroid}${language}`;
            }
        }
        return appsFlyerInfo;
    }

    getDataForAppsFlyer = (appsflayerData) => {
        let appsFlyerInfo = "";
        for (const appsKey in appsflayerData) {
            if (appsflayerData[appsKey]) {
                switch (appsKey) {
                    case "campaign":
                        appsFlyerInfo += `&model.linkId=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_sub1":
                        appsFlyerInfo += `&model.affiliateId=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_sub2":
                        appsFlyerInfo += `&model.affiliateUserToken=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_sub3":
                        appsFlyerInfo += `&model.sky=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_adset":
                        appsFlyerInfo += `&model.utmCampaign=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    default:
                        break;
                }
            }
        }
        return appsFlyerInfo;
    }

    getDataForMyTargets = (appsflayerData) => {
        let appsFlyerInfo = "";
        for (const appsKey in appsflayerData) {
            if (appsflayerData[appsKey]) {
                switch (appsKey) {
                    case "campaign":
                        appsFlyerInfo += `&model.linkId=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_ad_id":
                        appsFlyerInfo += `&model.utmContent=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_ad":
                        appsFlyerInfo += `&model.utmTerm=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_adset_id":
                        appsFlyerInfo += `&model.utmSource=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                    case "af_adset":
                        appsFlyerInfo += `&model.utmCampaign=${encodeURIComponent(appsflayerData[appsKey])}`;
                        break;
                }
            }
        }
        return appsFlyerInfo;
    }

    getDataForAMS = (appsflayerData) => {
        let appsFlyerInfo = "";
        const campaignId = this.getCampaignId(appsflayerData['campaign']);

        appsFlyerInfo += `&model.campaignId=${encodeURIComponent(campaignId)}`;
        appsFlyerInfo += `&model.linkId=${encodeURIComponent(appsflayerData['campaign'])}`;
        appsFlyerInfo += `&model.affiliateId=${encodeURIComponent('10031')}`;
        appsFlyerInfo += `&model.affiliateSystemName=${encodeURIComponent('AMS')}`;

        return appsFlyerInfo;
    }

    getCampaignId = (appsflyer) => {
        let campaignId = 0;
        switch (appsflyer) {
            case 'media-appsflyer1':
                campaignId = 1000057;
                break;
            case 'media-appsflyer2':
                campaignId = 1000062;
                break;
            case 'media-appsflyer3':
                campaignId = 1000063;
                break;
            case 'media-appsflyer4':
                campaignId = 1000064;
                break;
            case 'media-appsflyer5':
                campaignId = 1000065;
                break;
            case 'media-appsflyer6':
                campaignId = 1000066;
                break;
            case 'media-appsflyer7':
                campaignId = 1000067;
                break;
            case 'media-appsflyer8':
                campaignId = 1000068;
                break;
            case 'media-appsflyer9':
                campaignId = 1000069;
                break;
            case 'media-appsflyer10':
                campaignId = 1000070;
                break;
            case 'test-hammer-appsf':
                campaignId = 1000071;
                break;
            default:
                break;
        }
        return campaignId;
    }

    onInstallConversionDataCanceller = () => {
        appsFlyer.onInstallConversionData(
            (data) => {
                store.dispatch({ type: 'SET_APPSFLYER_DATA', data: data.data });
            }
        )
    }

    initSdk = () => {
        appsFlyer.initSdk(options,
            (result) => {
                console.warn('appsFlyer.initSdk', result);
            },
            (error) => {
                console.error('appsFlyer.initSdk', error);
            }
        )
    }

    // registartionAttemptEvent = (GUID) => {
    //     const registrationEvent = "Attempt";
    //     const eventValues = {
    //         "af_customer_user_id": GUID
    //     }
    //     appsFlyer.trackEvent(registrationEvent, eventValues,
    //         (result) => {
    //             console.log('appsFlayer_registartion Error - ', result, GUID);
    //         },
    //         (error) => {
    //             console.error('appsFlayer_registartion Error - ', error);
    //         }
    //     )
    // }

    registartionEvent = (GUID, eventName) => {
        // let registrationEvent = "af_registration_method";
        // const registrationEvent = "Attempt";
        const eventValues = {
            "af_customer_user_id": GUID
        }
        appsFlyer.trackEvent(eventName, eventValues,
            (result) => {
                console.warn(`appsFlayer_registartion ${eventName}  - `, result, GUID);
            },
            (error) => {
                console.error('appsFlayer_registartion Attempt Error - ', error);
            }
        )
    }

    getAppsFlyerUID = () => {
        appsFlyer.getAppsFlyerUID((error, appsFlyerUID) => {
            if (error) {
                console.error(error);
            } else {
                store.dispatch({ type: 'SET_APPSFLYERUID_DATA', data: appsFlyerUID });
            }
        });
    }
}