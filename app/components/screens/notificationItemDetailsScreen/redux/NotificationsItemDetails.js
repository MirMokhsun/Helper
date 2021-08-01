
const initialState = {
    notificationItemDetailsObj: { 
        title: "",
        descriptions: ""
    },
};

export default function notificationsItemDetails(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_DATA_NOTIFICATION_ITEM_DETAILS":
            return {
                ...state,
                notificationItemDetailsObj: data,
            };
        default:
            return state;
    }
} 