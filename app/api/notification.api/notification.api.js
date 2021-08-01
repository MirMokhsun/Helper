/* eslint-disable no-restricted-syntax, consistent-return */
import Utils from '../utils/utils';
import { config } from '../config';

let instance = null;
export default class NotificationApi {
    constructor() {
        if (!instance) {
            instance = this;
            // this.url = "http://192.168.1.222/notificationapi"; //test url
            // this.url = "http://news.finversia.ru/notificationApi"; //test url
            this.url = config.links.NOTIFICATION_DOMEN;
            this.registrationToken = config.links.NOTIFICATION_REG_TOKEN;
            this.getMessages = config.links.NOTIFICATION_GET_MESSAGES;
            this.wasRead = config.links.NOTIFICATION_WAS_READ;
            this.token = "";
            this.email = "";
            this.sha256 = "";
        }
        return instance;
    }

    __callFeach = async (auth, url, body) => {
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            };
            if (auth) {
                headers.Authorization =`Basic ${auth}`;
            }
            let response = await fetch(url, {
                method: "POST",
                headers,
                body,
            }).then(res => {
                return res.text()
            }).then(text => {
                return text;
            })
            return await response;
        } catch (error) {
            console.warn('NotificationApi: ', error);
        }
    }

    setFireBaseSettings = async (fcmToken, email, lang) => {
        try {
            let response = null;
            if (fcmToken && email) {
                const bodyForToken = { "AppName": "AnalyticsLite", "HashCustomer": email, "Token": fcmToken, "Lang": lang };
                const body = Utils.getJSON(bodyForToken);
                response = await this.__callFeach('', config.links.NOTIFICATION_DOMEN + config.links.NOTIFICATION_REG_TOKEN, body);
            }
            return response;
        } catch (error) {
            console.warn(error);
            return null;
        }
    }

    getHistoryNotification = async (email) => {
        try {
            let result = [];
            if (email) {
                const bodyForToken = { "Count": 10, "Offset": 0, "IsPageCount": false };
                const auth = { "HashCustomer": email, "AppName": "AnalyticsLite" };
                const json = Utils.getJSON(bodyForToken);
                const authJSON = Utils.getJSON(auth);
                result = await this.__callFeach(authJSON, config.links.NOTIFICATION_DOMEN + config.links.NOTIFICATION_GET_MESSAGES, json);
            }
            return result;
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    setWasReadNotification = async (email, id) => {
        try {
            let result = null;
            if (email) {
                const auth = { "HashCustomer": email, "AppName": "AnalyticsLite" };
                const authJSON = Utils.getJSON(auth);
                result = await this.__callFeach(authJSON, config.links.NOTIFICATION_DOMEN + config.links.NOTIFICATION_WAS_READ + id, '');
            }
            return result;
        } catch (error) {
            console.warn(error);
        }
    }

    addNewNotification = (newNot, arrayNot) => {
        let result = [];
        if (newNot && arrayNot && arrayNot.length >= 10) {
            arrayNot.pop();
            arrayNot.unshift(newNot);
            result = arrayNot;

        } else {
            arrayNot.unshift(newNot);
            result = arrayNot;
        }
        return result;
    }

    getCountReadNotification = (notification) => {
        let result = 0;
        if (notification) {
            for (const element of notification) {
                if (!element.wasRead) {
                    result += 1;
                }
            }
        }
        return result;
    }
}

export const createNotificationObj = (title, body, msgID, msgTimeSent, wasRead, bodyType = "TEXT") => {
    let result = null;
    if (title && body && msgID && msgTimeSent) {
        result = {
            msgID,
            TimeExpiration: 0,
            body,
            title,
            msgTimeSent,
            wasRead,
            bodyType
        }
    }
    return result;
}