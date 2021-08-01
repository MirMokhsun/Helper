
const initialState ={id :1};

export default function setNewsDetails(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_NEWS_DETAILS":
            return {
                ...state,
                id: data,
            };
        default:
            return state;
    }
}