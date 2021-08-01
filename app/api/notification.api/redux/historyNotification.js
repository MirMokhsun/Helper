const InitialState = [];

export default function historyNotification(state = InitialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_NOTIFICATION_HISTORY":
            return {
                ...state,
                ...data
            };
        default:
            return state;
    }
}