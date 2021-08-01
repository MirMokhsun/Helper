const initialState = {
    filterHelpText: "",
};

export default function searchInHelp(state = initialState, action) {
    const { type, text } = action;
    switch (type) {
        case 'SET_SEARCH_IN_HELP_TEXT':
            return {
                ...state,
                filterHelpText: text,
            };
        default:
            return state;
    }
}