import AsyncStorage from '@react-native-async-storage/async-storage';

export const writeInAsyncStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.warn(error)
    }
}

export const getFromAsyncStorage = async (key) => {
    try {
        let result = '';
        result = await AsyncStorage.getItem(key);
        return result;

    } catch (error) {
        return ''
    }
}