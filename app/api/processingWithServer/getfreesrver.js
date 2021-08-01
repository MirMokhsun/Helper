/* eslint-disable import/no-cycle */
import { WebSocketSingleton } from "../../common/webSocketClient/index";
import store from "../../redux/store/store";
import { config } from "../config";

let instance = null;
export default class FreeServer {
    constructor(url = config.links.DEFAULT_WS_CONNECTION) {
        if (!instance) {
            instance = this;
            this.url = url;
            this.UrlConnectingStr = config.links.DEFAULT_WS ;
        }
        return instance;
    }

    getFreeServer = () => {
        this.__callFeach(config.links.DEFAULT_WS, this.setWebsoketConection);
    }

    __callFeach = (url, callback) => {
        fetch(url)
            .then(data => {
                let result='';
                if (data.status === 200) {
                    result = data.text();
                }
                return result;
            }).then((text) => {
                callback(text);
            });
    }

    setWebsoketConection = (serverName) => {
        this.serverName = serverName;
        let websoket;
        if (this.serverName) {
            websoket = new WebSocketSingleton(`ws://${this.serverName+config.links.WS}/wss/Server.ashx?subscriber=true`);
        } else {
            websoket = new WebSocketSingleton(config.links.DEFAULT_WS_CONNECTION);
        }
        store.dispatch({ type: 'SET_WEBSOCKET', data: websoket });
    }
}