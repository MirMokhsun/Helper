
const initialState = {
  webSocketClient: null
};

export default function webSocketClient(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "SET_WEBSOCKET":
      return {
        ...state,
        webSocketClient: data,
      };
    default:
      return state;
  }
}