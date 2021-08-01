export function setZoomCharts(data) {

    return dispatch => {
        return dispatch({
            type: "SET_ZOOM_CHARTS",
            data
        });
    };
}
