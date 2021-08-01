const initialState = {
    language: 'en',
};

export default function currentLanguage(state = initialState, action) {
    const { type } = action;
    switch (type) {
        case "SET_LANGUAGE_ES":
            return {
                ...state,
                language: 'es',
            };
        case "SET_LANGUAGE_EN":
            return {
                ...state,
                language: 'en',
            };
        case "SET_LANGUAGE_RU":
            return {
                ...state,
                language: 'ru',
            };
        case "SET_LANGUAGE_AR":
            return {
                ...state,
                language: 'en',
            };
        default:
            return state;
    }
}