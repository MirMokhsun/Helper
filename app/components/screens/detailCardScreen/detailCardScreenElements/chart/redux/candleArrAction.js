export function cleanDatesArr(data) {
    return dispatch => {
        return dispatch({
            type: "CLEAN_DATES",
            data
        });
    };
}

export function setFunctionSetArr(data) {
    return dispatch => {
        return dispatch({
            type: "SET_FUNC",
            data
        });
    };
}