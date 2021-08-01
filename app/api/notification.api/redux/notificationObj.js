const InitialState = {
    ID: 1,
    TimeExpiration: 0,
    MsgText: "MsgText",
    Title: "Title",
    TimeSent: 1547827677,
    WasRead: false,
};

export default function setNotificationObj(state = InitialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_NOTIFICATION_OBJ":
            return {
                ...state,
                ...data
            };
        default:
            return state;
    }
}