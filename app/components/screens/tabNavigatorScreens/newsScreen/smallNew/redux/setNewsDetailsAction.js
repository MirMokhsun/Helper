
export function setNewsDetails(id) {
    return dispatch => {
        return dispatch({
            type: "SET_NEWS_DETAILS",
            data: id
        });
    };
}