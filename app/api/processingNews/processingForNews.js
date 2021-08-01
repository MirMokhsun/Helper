/* eslint-disable no-undef */

import { config } from "../config";

/* eslint-disable prefer-destructuring */
let instance = null;
export default class ApiForNews {
    constructor(url = config.links.NEWS) {
        if (!instance) {
            instance = this;
            this.url = url;
            this.enMounth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            this.arMounth = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
            this.ruMounth = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
            this.esMounth = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septriembre", "octubre", "noviembre", "diciembre"];
        }
        return instance;
    }

    getRandomNumb = (count) => {
        let result = 1;
        if (count) {
            result = Math.floor(Math.random() * count);
        }
        return result;
    }

    __callFeach = (url, callback) => {
        if (!url) {
            url = config.links.NEWS;
        }
        fetch(url)
            .then(data =>
                data.text())
            .then((context) => {
                callback(this.getFromJSON(context));
            });
    }

    getTwentyWords = (text, count) => {
        let result = '';
        if (text && count) {
            const arrayWords = text.split(" ");
            const countsWords = this.getCountWords(arrayWords.length, count);
            result = `${arrayWords.slice(0, countsWords).join(" ")}...`;
        }
        return result;
    }

    getCountWords = (arrayLength, count) => {
        let result = 0;
        if (arrayLength && count) {
            if (arrayLength < count) {
                result = arrayLength;
            }
            else {
                result = count;
            }
        }
        return result;
    }

    createDateAsUTC = (date) => {
        let result = Date.now();
        if (date) {
            result = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
        }
        return result;
    }

    getLocalDate(timeStamp, callback, getMounth, isNotification) {
        let result = "18:08 22 октября, 2018";
        if (timeStamp && callback && getMounth) {
            const newData = JSON.stringify(this.createDateAsUTC(new Date(timeStamp * 1000)));
            const splitData = newData.split('T');
            const dataYearsAndMuns = splitData[0].split('-');
            const timeHourAndMin = splitData[1].split(':');
            result = callback(timeHourAndMin, dataYearsAndMuns, getMounth, isNotification);
        }
        return result;
    }

    splitData = (data, regexp) => {
        let result = "";
        if (date) {
            result = data.split(regexp);
        }
        return result;
    }

    selectLocationData = (location, data, isNotification) => {
        let result = "18:08 22 октября, 2018";
        switch (location) {
            case "es":
                result = this.getLocalDate(data, this.getValidDate, this.esMounth, isNotification);
                break;
            case "ru":
                result = this.getLocalDate(data, this.getValidDate, this.ruMounth, isNotification);
                break;
            case "en":
                result = this.getLocalDate(data, this.getValidDate, this.enMounth, isNotification);
                break;
            case "ar":
                result = this.getLocalDate(data, this.getValidDate, this.arMounth, isNotification);
                break;
            default:
                break;
        }
        return result;
    }

    getValidDate = (timeHourAndMin, dataYearsAndMuns, getMounth, isNotification) => {
        let result = "18:08 22 октября, 2018";
        if (timeHourAndMin && dataYearsAndMuns && getMounth) {
            if (isNotification) {
                result = `${dataYearsAndMuns[2]} ${getMounth[dataYearsAndMuns[1] - 1]}, ${dataYearsAndMuns[0].replace("\"", '')} `;
            }
            else {
                result = `  ${timeHourAndMin[0]}:${timeHourAndMin[1]}   ${dataYearsAndMuns[2]} ${getMounth[dataYearsAndMuns[1] - 1]}, ${dataYearsAndMuns[0].replace("\"", '')} `;
            }
        }
        return result;
    }

    getFromJSON = (data) => {
        let result = "";
        if (data) {
            result = JSON.parse(data);
        }
        return result;
    }

    isDefoultImages = (src) => {
        let result = "";
        if (src) {
            result = src.indexOf('default') == -1;
        }
        return result;
    }
}
