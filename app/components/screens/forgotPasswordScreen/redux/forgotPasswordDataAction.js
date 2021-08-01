export function setForgotPasswordEmail(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_EMAIL_FORGOT_PASSWORD',
            data
        });
    };
}