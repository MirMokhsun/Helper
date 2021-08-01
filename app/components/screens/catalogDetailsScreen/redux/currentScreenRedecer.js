const initialState = {
    screenName: '',
    setNewQuotationMap: null,
};

export default function currentCatalogScreen(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'SET_CURRENT_SCREEN':
            return {
                ...state,
                screenName: data,
            };
        case 'SET_CURRENT_FUNCTION':
            return {
                ...state,
                setNewQuotationMap: data,
            };
        default:
            return state;
    }
}