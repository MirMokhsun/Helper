const initialState = {
    userEmail: '',
};

export default function userLoginData(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                userEmail: data,
            };
        default:
            return state;
    }
}