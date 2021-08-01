import Axios from "axios";
import { config } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from "../utils/utils";

const getJSON = async (url) => {
    try {
        const hedders = Utils.isIOS ? { 'Cache-Control': 'no-cache' } : { 'Content-Type': 'application/json', key: 'Cache-Control', value: 'no-cache' };
        const response = await Axios.get(url, {
            headers: { 'Cache-Control': 'no-cache' },
            ...hedders,
            responseType: 'json',
            timeout: 60000,
        });
        return response.data;
    } catch (error) {
        console.warn('getJSON: ', error);
        return { status: 'error' };
    }
};

const updateLinks = async (links, storedConfig) => {
    try {
        if (links?.status === 'ok' && (Number(links.version) > storedConfig?.version)) {
            const data = JSON.stringify(links);
            await AsyncStorage.setItem('CONFIG', data);
            config.links = links;
        } else if (links.status === 'ok' && storedConfig) {
            config.links = { ...storedConfig };
        }
    } catch (error) {
        console.warn('updateLinks: ', error);
    }
};

export const InitConfig = async () => {
    try {
        const links = await getJSON(config.links.LINKS);
        let storedConfig = await AsyncStorage.getItem('CONFIG');
        let data = { version: 0 };
        if (storedConfig) {
            data = JSON.parse(storedConfig);
        }
        await updateLinks(links, data);
    } catch (error) {
        console.warn('InitConfig: ', error);
    }
};