export function setSearchCountryText(text) {
    return dispatch => {
        return dispatch({
            type: 'SET_CARRENT_SEARCH_COUNTRY_TEXT',
            text,
        });
    };
}