/* eslint-disable import/no-mutable-exports */
import store from "../../redux/store/store";
import FreeServer from "../processingWithServer/getfreesrver";

export let instance = null;

export class RequestTecnivalAnalize {

    constructor() {
        if (!instance) {
            instance = this;
            this.freserver = new FreeServer();
        }

        return instance;
    }

    getDataToUpdateSPR = (period) => {
        let result;
        const bigPeriods = ["Minute30", "Hour", "Hour4", "Hour8", "Day", "Week"];
        if (bigPeriods.indexOf(period) >= 0) {
            result = "Week";
        } else {
            result = "Day";
        }
        return result;
    }

    getCandelsFromServer = (id, piriod) => {
        const { webSocketClient } = store.getState().webSocketClient;
        const messageGetValues = JSON.stringify({
            module: 'values',
            cmd: 'period',
            args: {
                period: piriod,
                id: `${id}`,
                withCurrentBar: true,
                count: 300
            }
        });
        if (webSocketClient) {
            webSocketClient.webSocketClient.onWebSocketSend(messageGetValues);
        }
        const updateSPR = this.getDataToUpdateSPR(piriod);
        const messageUpdate = JSON.stringify({
            module: 'values',
            cmd: 'period',
            args: {
                period: updateSPR,
                id: `${id}`,
                count: 1
            }
        });
        if (webSocketClient) {
            webSocketClient.webSocketClient.onWebSocketSend(messageUpdate);
        }
    }

    getTimeSecondFormat = (piriod) => {
        let result = 3600000;
        if (piriod) {
            switch (piriod) {
                case 'Hour':
                    result = 3600000;
                    break;
                case 'Minute30':
                    result = 1800000;
                    break;
                case 'Minute15':
                    result = 900000;
                    break;
                case 'Minute5':
                    result = 300000;
                    break;
                case 'Minute':
                    result = 60000;
                    break;
                default:
            }
        }
        return result;
    }

    sendMassegeWebSoket = (_id, _period) => {
        const messageGetCandleClose = JSON.stringify({
            module: 'binding',
            cmd: 'update',
            args: [{
                id: _id,
                period: _period
            }]
        });
        store.getState().webSocketClient.webSocketClient.webSocketClient.onWebSocketSend(messageGetCandleClose);
    }
}