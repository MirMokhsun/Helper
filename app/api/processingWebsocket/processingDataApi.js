/* eslint-disable no-prototype-builtins */
import store from '../../redux/store/store';
import { setCardItem } from '../../components/screens/detailCardScreen/redux/cardItemAction';

export const updatingDataFromServer = (dataFromServer) => {
    const map = {
        currency: {},
        commodity: {},
        index: {},
        stock: {},
    };
    if (dataFromServer) {
        const { item } = store.getState().cardItem;
        for (const key in dataFromServer) {
            if (item && dataFromServer[key].ID === item.ID) {
                store.dispatch(setCardItem(dataFromServer[key]));
            }
            switch (dataFromServer[key].Market) {
                case "Currency":
                    map.currency[dataFromServer[key].ID] = dataFromServer[key];
                    break;
                case "Commodity":
                    map.commodity[dataFromServer[key].ID] = dataFromServer[key];
                    break;
                case "Index":
                    map.index[dataFromServer[key].ID] = dataFromServer[key];
                    break;
                case "Stock":
                    map.stock[dataFromServer[key].ID] = dataFromServer[key];
                    break;
                default:
            }
        }
    }
    return map;
}

export const updateCurrentCatalogScreen = (map) => {
    const { screenName, setNewQuotationMap } = store.getState().currentCatalogScreen;
    if (screenName && setNewQuotationMap) {
        setNewQuotationMap(map[screenName]);
    }
}

export const updatingDataFromServerForFavorites = (dataFromServer) => {
    const {
        currentCatalogScreen: { setNewQuotationMap },
        functionAddQuotationMap: { getQuotationMap }
    } = store.getState();
    const map = {};
    const { favoritesObj } = getQuotationMap();

    if (dataFromServer && setNewQuotationMap) {
        for (const key in dataFromServer) {
            const id = dataFromServer[key].ID;
            if (favoritesObj.hasOwnProperty(id)) {
                map[id] = dataFromServer[key];
            }
        }
        setNewQuotationMap(map);
    }
}