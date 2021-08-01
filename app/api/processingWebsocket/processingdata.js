import store from '../../redux/store/store';
import { updatingDataFromServer, updateCurrentCatalogScreen, updatingDataFromServerForFavorites } from './processingDataApi';

import { endCandleFrameAction } from '../../components/screens/detailCardScreen/detailCardScreenElements/chart/redux/addInEndCandleFrameAction';
import { setPivotPoint, setRecomendation } from '../../components/screens/detailCardScreen/redux/cardItemAction';
// import { checkLoadStartAnimation } from './setdatafromserver';
// import { setArrayUpdatedCandlesFromWSAction } from '../../components/screens/chartsScreen/redux/actionSetArrayUpdatedCandlesFromWS';

export const processingData = async (data) => {
    const dataFromJson = JSON.parse(data);
    switch (dataFromJson.cmd) {
        case "": // recive quotations
            if (dataFromJson.args) {
                if (store.getState().currentCatalogScreen.screenName == 'favorites') {
                    updatingDataFromServerForFavorites(dataFromJson.args);
                }
                const map = updatingDataFromServer(dataFromJson.args);
                store.getState().functionAddQuotationMap.setQuotationMap(map);
                await updateCurrentCatalogScreen(map);
            }
            break;
        case "period":
            if (dataFromJson.args) {
                const {data} = dataFromJson.args;
                // get 300 candles

                if (data.length > 2) {
                    data.reverse();
                    store.getState().candlesFunc.func(data);
                    store.dispatch(setRecomendation(dataFromJson.args));
                }

                if (Object.keys(data).length == 1) {
                    // send 1 candle to redux for counting PivotData
                    store.dispatch(setPivotPoint(dataFromJson.args));
                }
            }
            break;
        case "update":
            if (dataFromJson.args) {

                const item = dataFromJson.args.bar;
                store.dispatch(endCandleFrameAction({
                    isEnd: true,
                    candle: { C: parseFloat(item.closeBid), H: parseFloat(item.highBid), L: parseFloat(item.lowBid), O: parseFloat(item.openBid), T: parseFloat(item.time) },
                }));
            }
            break;

        default:
    }
}