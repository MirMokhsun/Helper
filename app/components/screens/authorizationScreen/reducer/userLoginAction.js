export function setUserData(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_USER_DATA',
            data
        });
    };
}