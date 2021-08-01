const initialState = {
    navigator: null,
};

export default function stackNavigator(state = initialState, action) {
    const { type, stackNav } = action;
    switch (type) {
        case 'SET_STACKNAV':
            return {
                ...state,
                navigator: stackNav,
            };
        default:
            return state;
    }
}