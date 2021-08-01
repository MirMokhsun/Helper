export function setNewsAction(news) {
    return (dispatch) => {
        return dispatch({
            type: "SET_NEW_IN_NEWSSCREEN",
            data: news
        })
    }
}