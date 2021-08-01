import WebSocketClient from './WebSocketClient';

let instance = null;
export class WebSocketSingleton {
    constructor(url) {
        if (!instance && url) {
            instance = this;
            this.webSocketClient = new WebSocketClient({ wsUrl: url });
        }
        return instance;
    }
}

// export const webSocketClient = new WebSocketSingleton().webSocketClient;
