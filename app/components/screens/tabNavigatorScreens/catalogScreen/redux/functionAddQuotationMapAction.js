export function setFuncGetQuotationMap(data) {
    return dispatch => {
        return dispatch({
            type: 'GET_QUOTATION_MAP',
            data: data
        });
    };
}

export function setFuncSetQuotationMap(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_QUOTATION_MAP',
            data: data
        });
    };
}
export function setFuncSetQuotationFavorites(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_QUOTATION_FAVORITES_FUNC',
            data: data
        });
    };
}
