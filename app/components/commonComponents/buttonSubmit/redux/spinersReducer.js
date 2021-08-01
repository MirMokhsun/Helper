const initialState = {
    forgotPasswordSpiner: false,
    authorizationSpiner: false,
    registrationSpiner: false,
};

export default function spiners(state = initialState, action) {
    const { type } = action;
    switch (type) {
        case 'SET_FORGOTPASSWORDSPINER_HIDE':
            return {
                ...state,
                forgotPasswordSpiner: false,
            };
        case 'SET_FORGOTPASSWORDSPINER_SHOW':
            return {
                ...state,
                forgotPasswordSpiner: true,
            };
        case 'SET_AUTHORIZATIONSPINER_HIDE':
            return {
                ...state,
                authorizationSpiner: false,
            };
        case 'SET_AUTHORIZATIONSPINER_SHOW':
            return {
                ...state,
                authorizationSpiner: true,
            };
        case 'SET_REGISTRATIONSPINER_HIDE':
            return {
                ...state,
                registrationSpiner: false,
            };
        case 'SET_REGISTRATIONSPINER_SHOW':
            return {
                ...state,
                registrationSpiner: true,
            };
        default:
            return state;
    }
}