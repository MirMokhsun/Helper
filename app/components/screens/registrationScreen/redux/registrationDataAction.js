export function setRegistrationEmail(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_EMAIL_REGISTRATION',
            data
        });
    };
}

export function setRegistrationFirstName(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_FIRSTNAME_REGISTRATION',
            data
        });
    };
}

export function setRegistrationLastName(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_LASTNAME_REGISTRATION',
            data
        });
    };
}

export function setRegistrationCountry(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_COUNTRY_REGISTRATION',
            data
        });
    };
}

export function setRegistrationPhone(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_PHONE_REGISTRATION',
            data
        });
    };
}

export function setRegistrationPhoneCode(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_PHONE_CODE_REGISTRATION',
            data
        });
    };
}

export function setRegistrationCheckbox() {
    return dispatch => {
        return dispatch({
            type: 'IS_VALID_AGREEMENT_CHECKBOX'
        });
    };
}