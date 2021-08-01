export function setCurrentCatalogScreen(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_CURRENT_SCREEN',
            data
        });
    };
}

export function setFunctionNewQuotationMap(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_CURRENT_FUNCTION',
            data
        });
    };
}
