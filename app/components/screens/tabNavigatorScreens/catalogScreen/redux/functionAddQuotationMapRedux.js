const initialState = {
    getQuotationMap: null,
    setQuotationMap: null,
    setQuotationFavorites: null,
};

export default function functionAddQuotationMap(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'GET_QUOTATION_MAP':
            return {
                ...state,
                getQuotationMap: data,
            };
        case 'SET_QUOTATION_MAP':
            return {
                ...state,
                setQuotationMap: data,
            };
        case 'SET_QUOTATION_FAVORITES_FUNC':
            return {
                ...state,
                setQuotationFavorites: data,
            };
        default:
            return state;
    }
}