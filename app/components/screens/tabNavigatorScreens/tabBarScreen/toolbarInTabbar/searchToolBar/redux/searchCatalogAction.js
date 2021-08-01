export function setSearchCatalogText(text) {
    return dispatch => {
        return dispatch({
            type: 'SET_SEARCH_CATALOG_TEXT',
            text,
        });
    };
}