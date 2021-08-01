export function endCandleFrameAction(data) {
    return dispatch => {
        return dispatch({
            type: 'IS_END',
            data
        });
    };
}
