/* eslint-disable prefer-destructuring */
import IndicatorRecommendation from "../../../../api/indicatorsLibs/recommendationForIndicators";

export function setCardItem(data) {
    return dispatch => {
        return dispatch({
            type: 'SET_CURRENT_ITEM',
            data
        });
    };
}

export function setNullPivotPointCardItemRecomendation() {
    return dispatch => {
        return dispatch({
            type: 'SET_CURRENT_DATA_NULL',
        });
    };
}

export function setPivotPoint(dataBars) {
    let data = { Pivot: "--" };
    if (dataBars) {
        const pivotData = IndicatorRecommendation.getDataPivot([dataBars.data[0]])[0];
        data = pivotData;
    }
    return dispatch => {
        return dispatch({
            type: 'SET_PIVOTPOINT',
            data
        });
    };
}

export function setRecomendation(dataCandelsTemp) {
    let data = { Summary: 'Neutral' };
    if (dataCandelsTemp) {
        const dataFrom = [...dataCandelsTemp.data];
        dataFrom.pop();
        data = IndicatorRecommendation.getDataForTechnicalSummary(dataFrom, '', true)[0];
    }

    return dispatch => {
        return dispatch({
            type: 'SET_RECOMENDATION',
            data
        });
    };
}