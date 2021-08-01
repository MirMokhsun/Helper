export function setNotificationItemDetailsObj(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_DATA_NOTIFICATION_ITEM_DETAILS',
            data
        });
    };
}