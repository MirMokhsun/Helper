const initialState = {
    appsFlyerData: {},
    getAppsFlyerUID: "",
};

export default function appsFlyerData(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case 'SET_APPSFLYER_DATA':
            return {
                ...state,
                appsFlyerData: data,
            };
        case 'SET_APPSFLYERUID_DATA':
            return {
                ...state,
                getAppsFlyerUID: data,
            };
        default:
            return state;
    }
}