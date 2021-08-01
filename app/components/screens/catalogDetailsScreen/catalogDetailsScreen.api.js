/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus, no-continue */
export const removeFromCurrentCards = (newCurrentCards, id) => {
    for (let i = 0; i < newCurrentCards.length; ++i) {
        if (newCurrentCards[i].key === id) {
            newCurrentCards.splice(i, 1);
            break;
        }
    }
    return newCurrentCards;
}

export const copyCurrentMapWithoutOne = (currentMap, id) => {
    const newMap = {};
    for (const key in currentMap) {
        if (key == id) continue;
        newMap[key] = currentMap[key]
    }
    return newMap;
}

export const getAllNames = (object) => {
    const result = [];
    if (object) {
        for (const key in object) {
            result.push(object[key].Name)
        }
    }
    return result;
}

export const makeObjectWithManeKeys = (object) => {
    const result = {};
    if (object) {
        for (const key in object) {
            if (object[key].recommendations && object[key].recommendations.summary) {
                result[object[key].security] = object[key].recommendations.summary;
            }
        }
    }
    return result;
}