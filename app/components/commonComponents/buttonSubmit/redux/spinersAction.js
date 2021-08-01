export const hideAuthorizationSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_AUTHORIZATIONSPINER_HIDE',
        });
    };
}
export const showAuthorizationSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_AUTHORIZATIONSPINER_SHOW',
        });
    };
}


export const hideForgotPasswordSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_FORGOTPASSWORDSPINER_HIDE',
        });
    };
}

export const showForgotPasswordSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_FORGOTPASSWORDSPINER_SHOW',
        });
    };
}

export const hideRegistrationSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_REGISTRATIONSPINER_HIDE',
        });
    };
}

export const showRegistrationSpiner = () => {
    return dispatch => {
        return dispatch({
            type: 'SET_REGISTRATIONSPINER_SHOW',
        });
    };
}