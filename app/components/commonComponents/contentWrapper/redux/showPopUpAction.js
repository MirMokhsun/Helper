export function showPopUp(data) {
    return dispatch => {
        return dispatch({
            type: 'SHOW_POPUP',
            name: data,
        });
    };
}

export function hidePopUp() {
    return dispatch => {
        return dispatch({
            type: 'HIDE_POPUP',
        });
    };
}

export function showToast(data) {
    return dispatch => {
        return dispatch({
            type: 'SHOW_TOAST',
            name: data,
        });
    };
}

export function hideToast() {
    return dispatch => {
        return dispatch({
            type: 'HIDE_TOAST',
        });
    };
}