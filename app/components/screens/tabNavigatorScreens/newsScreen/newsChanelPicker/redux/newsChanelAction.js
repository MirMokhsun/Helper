
export function setNewsChanel(chanel) {
    return dispatch => {
        return dispatch({
            type: "SET_NEWS_CHANEL",
            data: chanel
        });
    };
}