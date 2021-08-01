
const initialState = {
    connectionStatus: "start",
    isConnected: false,
};

export default function connectionStatus(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_CONNECTION_STATUS":
            return {
                ...state,
                connectionStatus: data,
            };
        case "SET_IS_CONNECTED":
            return {
                ...state,
                isConnected: data,
            };
        default:
            return state;
    }
}