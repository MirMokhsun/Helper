import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSettingsData = async (data, settingsReducerProps) => {
    try {
        settingsReducerProps.setStateSettingCurrency(data);
        settingsReducerProps.setStateSettingGoods(data);
        settingsReducerProps.setStateSettingIndexes(data);
        settingsReducerProps.setStateSettingShares(data);
        settingsReducerProps.setStateSettingHome(data);

        setTimeout(async () => {
            const cardsSettingsJSON = JSON.stringify(settingsReducerProps.getQuotantionsSettingsObjCurrency());
            await AsyncStorage.setItem('@homeScreenCardsSettings:key', cardsSettingsJSON);
        }, 2000);
    } catch (error) {
        console.warn(error);
    }
}