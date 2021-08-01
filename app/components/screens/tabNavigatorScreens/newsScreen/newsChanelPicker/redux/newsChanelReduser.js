const initialState = {
    chanel: 'umarkets',
};

export default function newsChanel(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_NEWS_CHANEL":
            switch (data) {
                case 'UMarketsnews.com':
                    return {
                        ...state,
                        chanel: 'umarkets',
                    };
                case 'MSNfinance.com':
                    return {
                        ...state,
                        chanel: 'finversia',
                    };
                case 'Investing.com':
                    return {
                        ...state,
                        chanel: 'analytics',
                    };
            }
        default:
            return state;
    }
}