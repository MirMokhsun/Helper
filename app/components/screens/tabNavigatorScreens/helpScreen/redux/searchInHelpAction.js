export function setSearchInHelpText(text) {
    return dispatch => {
        return dispatch({
            type: 'SET_SEARCH_IN_HELP_TEXT',
            text: text,
        });
    };
}