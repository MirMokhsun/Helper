/* eslint-disable radix */
import store from "../../redux/store/store";
import { endCandleFrameAction } from "../../components/screens/detailCardScreen/detailCardScreenElements/chart/redux/addInEndCandleFrameAction";
import { checkNumbLessTen } from "../openCardLogic/openCardApi";


export default class CandleUpdater {
    // form last candle
    setValueCurrentItem = (currentCandleDraw, newCandleItem) => {
        const { Bid, Per } = newCandleItem;
        const item = {};
        item.C = currentCandleDraw.C;
        item.O = currentCandleDraw.O;
        item.L = currentCandleDraw.L;
        item.H = currentCandleDraw.H;
        item.T = currentCandleDraw.T;

        item.T = parseFloat(Per);
        item.C = parseFloat(Bid);
        if (item.H === 0 || item.H === null || item.H < parseFloat(Bid)) { item.H = parseFloat(Bid); }
        if (item.L === 0 || item.L === null || item.L > parseFloat(Bid)) { item.L = parseFloat(Bid); }
        if (item.O === 0 || item.O === null) { item.O = parseFloat(Bid); }

        return item;
    }

    // add updated candle from server
    addUpdateLastCandles = (candles, updatedItem,  _id) => {
        const timeFrame = candles[1].T - candles[0].T;
        if (candles[candles.length - 2] ) {
            candles[candles.length - 1] ;
            candles.shift();
            candles.push({ ...{ C: updatedItem.C, H: updatedItem.C, L: updatedItem.C, O: updatedItem.C, T:  + timeFrame } });

            store.dispatch(endCandleFrameAction({
                isEnd: false,
                candle: {},
            }))
        }
        return candles;
    }

    dateFormaterToArr = (dataCandels) => {
        const timeArr = [];
        for (const key in dataCandels) {
            const time = new Date(dataCandels[key].T * 1000);
            const myTime = `${checkNumbLessTen(parseInt(time.getHours()))}:${
                checkNumbLessTen(parseInt(time.getMinutes()))}\n ${
                checkNumbLessTen(parseInt(time.getDate()))}/${
                checkNumbLessTen(parseInt(time.getMonth()) + 1)}`;
            timeArr.push(myTime);
        }
        return timeArr;
    }

    updateArrWithCandlesAndReturnArrDates = (dataCandels, updateCandleItem) => {
        let candles = [...dataCandels];
        const lastItem = candles[candles.length - 1];
        let arrWithDates = null;
        // form last candle
        const updatedItem = this.setValueCurrentItem(lastItem, updateCandleItem);
        // add updated candle from server
        if (true) {
            candles = this.addUpdateLastCandles(candles, updatedItem);
            // callBack(candles);
            // form arr with dates
            arrWithDates = this.dateFormaterToArr(candles);
        }
        // update fast candle
        if (candles[candles.length - 1].C !== updatedItem.C && updatedItem.C !== 0) {
            candles[candles.length - 1] = updatedItem;
            // callBack(candles);
        }
        return arrWithDates;
    }
}