/* eslint-disable no-sequences, no-restricted-properties */
export const checkNumbLessTen = (numb) => {
    let result = "";
    if (`${numb}` && (numb <= 9) && (numb >= 0)) {
        result = `0${  numb}`;
    } else {
        result = numb;
    }
    return result;
}

export const getDataWithNeedFormat = (unixTimestamp) => {
    let time = "";
    if (unixTimestamp) {
        const date = new Date(unixTimestamp);
            const year = date.getFullYear();
            const month = date.getMonth();
            const dateMonth = date.getDate();
            const hour = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
        time = `${checkNumbLessTen(dateMonth)  }.${  checkNumbLessTen(month + 1)  }.${  checkNumbLessTen(year)  } | ${  checkNumbLessTen(hour)  }:${  checkNumbLessTen(min)  }:${  checkNumbLessTen(sec)}`;
    }
    return time;
}
export const getCountNumbersAftersPoint = (number) => {
    let result = 0;
    if (number) {
        result = number.toString().split(".")[1].length;
    }
    return result;
}
export const getSpred = (ask, bid) => {
    let result = 0;
    if (ask, bid) {
        const countAsk = getCountNumbersAftersPoint(ask);
        const countBid = getCountNumbersAftersPoint(bid);
        result = ((ask * Math.pow(10, countAsk)) - (bid * Math.pow(10, countBid))) / 10;
    }
    return result.toFixed(1);
}
