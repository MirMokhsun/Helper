import store from '../../redux/store/store';
import { processingData } from '../../api/processingWebsocket/processingdata';

export default class WebSocketClient {
    constructor({ wsUrl = '' } = {}) {
        this.wsUrl = wsUrl;
        this.createWebSocketConnection();
    }

    createWebSocketConnection = () => {
        this.websocket = new WebSocket(this.wsUrl);
        this.websocket.onopen = this.onWebSocketConnect;
        this.websocket.onmessage = this.onWebSocketMessage;
        this.websocket.reconect = this.onWebSocketReconect;
    }

    closeWebSocketConnection = () => {
        if (this.websocket) {
            this.websocket.close();
        }
    }

    onWebSocketSend = (message) => {
        if (store.getState().connectionStatus.isConnected) {
            this.websocket.send(message);
        }
    }

    onWebSocketMessage = (event) => {
        processingData(event.data);
    };

    onWebSocketReconect = () => {
        if (store.getState().connectionStatus.connectionStatus === "Lost Connection") {
            const reconnect = setInterval(() => {
                store.dispatch({ type: 'SET_CONNECTION_STATUS', data: this.websocket.readyState })
                if (this.websocket != null && this.websocket.readyState === 1) {
                    clearInterval(reconnect);
                } else if (!(this.websocket != null && this.websocket.readyState === 0)) {
                        this.websocket = null;
                        this.createWebSocketConnection();
                    }
            }, 5000);
        }
    }
}
