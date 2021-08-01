/* eslint-disable no-unneeded-ternary */
import { Platform, I18nManager, StatusBar, Dimensions } from 'react-native';
import {getLocalization}  from '../setLanguageInStartApp/setLanguageInStartApp';

const {isRTL} = I18nManager;

const setTextAlign = (language) => {
    let currentTextAlign = "left";

    if (language === "ar") {
        if (!isRTL) {
            currentTextAlign = "right";
        }
    } else if (isRTL) {
            currentTextAlign = "right";
    }

    return currentTextAlign;
}

const checkIsIOs = () => {
    return Platform.OS === "ios";
}

const getIsIphoneX = () => {
    return checkIsIOs() && (Dimensions.get("window").height > 800 || Dimensions.get("window").width > 800) ? true : false;
}

const isIos = checkIsIOs();

const _width = () => {
    const { width, height } = Dimensions.get('window');
    return (width < height) ? width : height;
}

const _height = () => {
    const { width, height } = Dimensions.get('window');
    let resultHeight = (width > height) ? width : height;
    resultHeight = checkIsIOs() ? resultHeight : resultHeight - StatusBar.currentHeight;
    return resultHeight;
}

const chackIsObjectEmpty = (obj) => {
    let objLenght = 0;
    if (typeof obj === "object" && obj != null) {
        objLenght = Object.keys(obj).length;
    }
    return !objLenght;
}

const getJSON = (str) => {
    let result = "";
    if (str) {
        result = JSON.stringify(str);
    }
    return result;
}

const fromJSON = (str) => {
    let result = "";
    if (str) {
        result = JSON.parse(str);
    }
    return result;
}

const Utils = {
    isIphoneX: getIsIphoneX(),
    isIOS: isIos,
    localization: getLocalization(isIos)? getLocalization(isIos).substring(0, 2): getLocalization(isIos),
    size: {
        width: _width(),
        height: _height()
    },
    chackIsObjectEmpty,
    setTextAlign,
    fromJSON,
    getJSON,
};

export default Utils;
