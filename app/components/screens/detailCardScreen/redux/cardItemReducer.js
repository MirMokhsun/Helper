const initialState = {
    item: null,
    pivotPoint: { Pivot: "--" },
    recomendation: { Summary: 'Neutral' },
};

export default function cardItem(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'SET_CURRENT_ITEM':
            return {
                ...state,
                item: data,
            };
        case 'SET_PIVOTPOINT':
            return {
                ...state,
                pivotPoint: data,
            };
        case 'SET_RECOMENDATION':
            return {
                ...state,
                recomendation: data,
            };
        case 'SET_CURRENT_DATA_NULL':
            return {
                ...state,
                item: null,
                pivotPoint: { Pivot: "--" },
                recomendation: { Summary: 'Neutral' },
            };
        default:
            return state;
    }
}
