const initialState = {
    email: { isValid: true, value: null },
    firstName: { isValid: true, value: null },
    lastName: { isValid: true, value: null },
    country: { isValid: true, value: "Страна", countryKey: "" },
    phone: { isValid: true, value: "" },
    phoneCode: 380,
    agreementCheckbox: { isValid: true },
};

export default function registrationData(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'IS_VALID_EMAIL_REGISTRATION':
            return {
                ...state,
                email: data,
            };
        case 'IS_VALID_FIRSTNAME_REGISTRATION':
            return {
                ...state,
                firstName: data,
            };
        case 'IS_VALID_LASTNAME_REGISTRATION':
            return {
                ...state,
                lastName: data,
            };
        case 'IS_VALID_COUNTRY_REGISTRATION':
            return {
                ...state,
                country: data,
            };
        case 'IS_VALID_PHONE_REGISTRATION':
            return {
                ...state,
                phone: data,
            };
        case 'IS_VALID_AGREEMENT_CHECKBOX':
            return {
                ...state,
                agreementCheckbox: { isValid: !state.agreementCheckbox.isValid },
            };
        case 'SET_PHONE_CODE_REGISTRATION':
            return {
                ...state,
                phoneCode: data,
            };
        default:
            return state;
    }
}