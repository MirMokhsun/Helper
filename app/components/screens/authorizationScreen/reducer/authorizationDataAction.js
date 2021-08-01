export function setAuthorizationEmail(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_EMAIL_AUTHORIZATION',
            data
        });
    };
}
export function setAuthorizationPassword(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_PASSWORD_AUTHORIZATION',
            data
        });
    };
}