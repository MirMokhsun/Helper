const initialState = {
    text: ''
};

export default function errorText(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_ERROR_TEXT":
            return {
                ...state,
                text: data,
            };

        default:
            return state;
    }
}