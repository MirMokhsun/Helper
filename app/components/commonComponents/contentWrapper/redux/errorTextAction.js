export function setErrorText(data) {
    return dispatch => {
        return dispatch({
            type: "SET_ERROR_TEXT",
            data,
        });
    };
}