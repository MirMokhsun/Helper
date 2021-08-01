const initialState = {
    closedItem: {
        isEnd: false,
        candle: { C: 0, H: 0, L: 0, O: 0, T: 0 },
    }
};

export default function endCandleFrame(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'IS_END':
            return {
                ...state,
                closedItem: data,
            };
        default:
            return state;
    }
}