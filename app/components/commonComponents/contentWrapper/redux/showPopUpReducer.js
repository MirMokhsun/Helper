const initialState = {
    isVisible: false,
    name: '',
    isVisibleToast: false,
    toastText: ''
};

export default function popUpVisibility(state = initialState, action) {
    const { type, name } = action;
    switch (type) {
        case "SHOW_POPUP":
            return {
                ...state,
                isVisible: true,
                name
            };
        case "HIDE_POPUP":
            return {
                ...state,
                isVisible: false,
            };
        case "SHOW_TOAST":
            return {
                ...state,
                isVisibleToast: true,
                toastText: name
            };
        case "HIDE_TOAST":
            return {
                ...state,
                isVisibleToast: false,
            };
        default:
            return state;
    }
}