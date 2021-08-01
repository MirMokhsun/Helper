const initialState = {
    text: "",
};

export default function searchCountryText(state = initialState, action) {
    const { type, text } = action;
    switch (type) {
        case 'SET_CARRENT_SEARCH_COUNTRY_TEXT':
            return {
                ...state,
                text,
            };
        default:
            return state;
    }
}