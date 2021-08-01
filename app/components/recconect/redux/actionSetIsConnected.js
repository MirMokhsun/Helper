
export function setIsConnected(data) {
    return dispatch => {
        return dispatch({
            type: "SET_IS_CONNECTED",
            data
        });
    };
}