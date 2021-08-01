const InitialState = {
    isNotOpen: false
};

export default function notificationDataOpen(state = InitialState, action) {
    const {
        type,
        data
    } = action;
    switch (type) {
        case "SET_IS_NOTIFICATION_OPEN":
            return {
                ...state,
                isNotOpen: data, 
              };
        default:
            return state;
    }
}