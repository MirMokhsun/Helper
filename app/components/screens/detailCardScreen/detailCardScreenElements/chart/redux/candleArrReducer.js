const initialState = {
    func: () => { },
    cleanDatesArr: null,
};

export default function candlesFunc(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_FUNC":
            return {
                ...state,
                func: data
            };
        case "CLEAN_DATES":
            return {
                ...state,
                cleanDatesArr: data
            };
        default:
            return state;
    }
}