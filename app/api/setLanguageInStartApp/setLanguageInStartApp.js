import { NativeModules, I18nManager } from 'react-native';

export const getPlatform = (platformOS) => {
    return platformOS === "ios";
}
export const getLocalization = (ios) => {
    return ios ? NativeModules.SettingsManager ? NativeModules.SettingsManager.settings.AppleLocale : '' || '' : NativeModules.I18nManager.localeIdentifier || '';
}
export const getLanguage = (curentLocale) => {
    let result = "";
    if (curentLocale) {
        result = curentLocale.substring(0, 2);
    }
    return result;
}
export const setLanguageInStartApp = (platformOS, setCurrentLanguage) => {
    const isIos = platformOS;
    const curentLocalization = getLocalization(isIos);
    const curentLanguage = getLanguage(curentLocalization);
    setCurrentLanguage(curentLanguage);
}

export const setRTLApp = (platformOS) => {
    const isIos = getPlatform(platformOS);
    const curentLocalization = getLocalization(isIos);
    const curentLanguage = getLanguage(curentLocalization);
    switch (curentLanguage) {
        case 'ar':
            if (!I18nManager.isRTL) {
                I18nManager.forceRTL(true);
            }
            break;
        default:
            if (I18nManager.isRTL) {
                I18nManager.forceRTL(false);
            }
    }
}