
export function addPushNotification(data) {
    return (dispatch) => {
        return dispatch({
            type: "SET_NOTIFICATION_OBJ",
            data
        })
    }
}
export function addPushNotificationHistory(data) {
    return (dispatch) => {
        return dispatch({
            type: "SET_NOTIFICATION_HISTORY",
            data
        })
    }
}