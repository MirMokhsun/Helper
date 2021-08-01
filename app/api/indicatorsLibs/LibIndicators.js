export default function LibIndicators() { // разарабатываемая версия

}

/*Autor: Sergey Nikitin */
LibIndicators.toDataDictionary = function (data) {
    var dataDictionary = {};
    for (var i = 0; i < data.length; i++) {
        dataDictionary[data[i].T] = data[i];
    }
    return dataDictionary;
}

/*Autor: Sergey Nikitin*/
LibIndicators.SMA_noRounding = function (data, period) {
    if ((data == null) || (data.length < period)) {
        return [];

    }

    var result = []; //массив объектов на выходе
    var dataSma = data.sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });
    var sma = 0; // значение точки 
    var sumForSMA = 0; // промежуточное значение
    var tSma = 0; // время в мс для точки
    var countPoint = 0; // количество просчитанных точек
    var arrForPoint = []; // промежуточный массив для расчета одной точки
    var stopPoint = dataSma.length - period; // достаточно ли количество значений необходимых для расчета одной точки
    for (var i = 0; i < dataSma.length; i++) {
        var val = dataSma[i];

        if (countPoint <= stopPoint) {
            arrForPoint = dataSma.slice(countPoint, countPoint + period);
            countPoint++;
            arrForPoint.forEach(function (val) {
                sumForSMA += val.C;
            });
            sma = (sumForSMA / period);
            tSma = val.T;
            sumForSMA = 0;
            if (isNaN(sma) || isNaN(tSma)) {
                continue;
            } else {
                result.push({ T: tSma, P: sma });
            }
        }
    }
    return result;
}

/*Autor: Sergey Nikitin and Sergey Sudakov */
LibIndicators.SMA = function (data, period, isCountPivot) { // — простое скользящее среднее
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var roundedValuesSmaTest = [];
    LibIndicators.SMA_noRounding(data, period)
        .forEach(function (x) {
            if (isCountPivot) {
                roundedValuesSmaTest.push({ T: x.T, P: customRound(x.P) });
            } else {
                roundedValuesSmaTest.push(customRound(x.P));
            }
        });

    return roundedValuesSmaTest;
}

/*Autor: Sergey Nikitin */
LibIndicators.EMA_noRounding = function (dataEma, period) {
    if ((dataEma == null) || (dataEma.length < period)) {
        return {};
    }
    dataEma = dataEma.sort(function (a, b) {
        if (a.T < b.T) return -1;
        if (a.T > b.T) return 1;
        return 0;
    });

    var dataforSma = dataEma.slice(0, period);
    var prev = LibIndicators.SMA_noRounding(dataforSma, period);//первое значение берется SMA
    var prevEma = prev[0].P; // значение первой точки
    prevEma = parseFloat(prevEma);
    var tEma = prev[0].T; // время первой точки
    var result = []; //массив объектов на выходе
    var kPrice = 0; // доля использования значения цены kPrice=2/(period+1)
    kPrice = 2 / (period + 1);
    var currentEma = 0; // текущее значение EMA
    result.push({ T: tEma, P: parseFloat(prevEma) }); // добавляем первую точку
    for (var i = period; i < dataEma.length; i++) {
        tEma = dataEma[i].T; // время текущей точки
        currentEma = (dataEma[i].C - prevEma) * kPrice + prevEma;
        prevEma = currentEma; // присваиваем текущее значение для испозования в формуле
        prevEma = customRound(prevEma);
        if (isNaN(prevEma) || isNaN(tEma)) {
            continue;
        }
        result.push({ T: tEma, P: prevEma }); // создаем новый объект и записываем его в массив
    }
    return result;
}

LibIndicators.EMA = function (data, period, isCountPivot) { // — экспоненциальное скользящее среднее
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var roundedValuesEma = [];
    LibIndicators.EMA_noRounding(data, period)
        .forEach(function (x) {
            if (isCountPivot) {
                roundedValuesEma.push({ T: x.T, P: customRound(x.P) });
            } else {
                roundedValuesEma.push(customRound(x.P));
            }
        });
    return roundedValuesEma;

}

LibIndicators.StandartDeviation = function (data, period) { // - стандартное отклонение
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var dataStandarttDeviation = data.sort(function (a, b) {
        if (a.T < b.T) return -1;
        if (a.T > b.T) return 1;
        return 0;
    });
    var stdTime = 0;
    var stDev = [];
    var stDev2 = [];
    var stDev3 = [];
    for (var i = 0; i <= dataStandarttDeviation.length - period; i++) {
        var sum = 0;
        for (var j = 0; j < period; j++) {
            sum += dataStandarttDeviation[i + j].C;
            stdTime = dataStandarttDeviation[i + j].T;
        }
        var stdSma = sum / period;
        stDev.push({ T: stdTime, C: stdSma });
        var sumDiff = 0.0;
        for (var k = 0; k < period; k++) {
            sumDiff += Math.pow(dataStandarttDeviation[i + k].C - stdSma, 2) / period;
        }
        stDev2.push({ T: stdTime, C: sumDiff });
    }
    for (var f = 0; f < stDev2.length; f++) {
        var currentStd = Math.sqrt(stDev2[f].C);
        stDev3.push({ T: stDev2[f].T, P: currentStd });
    }
    return LibIndicators.toDataDictionary(stDev3);
}
/*Autor: Sergey Sudakov */
LibIndicators.BollingerBands = function (data, period) { // - Полосы Боллинджера их 3
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var countDev = 2;
    var dataBollinger = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var result = {};
    var countPoint = 0;

    var arrForPoint = [];
    var stopPoint = dataBollinger.length - period;
    var stdDevrez = 0;
    var pointBollinger = 0;
    var middlePoint = 0;
    var upperPoint = 0;
    var lowerPoint = 0;

    result.upperLine = [];
    result.middleLine = [];
    result.lowLine = [];
    for (var i = 0; i < dataBollinger.length; i++) {
        var val = dataBollinger[i];
        if (countPoint <= stopPoint) {
            arrForPoint = dataBollinger.slice(countPoint, countPoint + period);
            countPoint++;
            pointBollinger = LibIndicators.SMA_noRounding(arrForPoint, period);
            stdDevrez = LibIndicators.StandartDeviation(arrForPoint, period);
            stdDevrez = getValuesFromDictionary(stdDevrez);
            middlePoint = pointBollinger[0].P;
            upperPoint = middlePoint + (countDev * stdDevrez[0].P);
            upperPoint = Math.round(upperPoint * 100000) / 100000;
            lowerPoint = middlePoint - (countDev * stdDevrez[0].P);
            lowerPoint = Math.round(lowerPoint * 100000) / 100000;
            if (isNaN(middlePoint) || isNaN(lowerPoint) || isNaN(upperPoint) || isNaN(val.T)) {
                continue;
            }
            result.upperLine.push(upperPoint);
            result.middleLine.push(middlePoint);
            result.lowLine.push(lowerPoint);
        }
    }
    return result;
}

/*Autor: Sergey Sudakov */
LibIndicators.Envelopes = function (data, period, deviation, param) { // 2 скользящие по которым определяеться когда покупать и продаваьть
    if ((data == null) || (data.length < period)) {
        return {};
    }
    if (!deviation) {
        deviation = 0.025;
    } else {
        deviation = deviation / 10000;
    }

    var moving;
    switch (param.toUpperCase()) {
        case "EMA":
            moving = param.toUpperCase();
            break;
        case "SMA":
            moving = param.toUpperCase();
            break;
        default:
            moving = "SMA";
    }

    var dataEnvelopes = data;
    var result = [];
    var pointEnvelopes = 0;
    var middlePoint = 0;
    var upperPoint = 0;
    var lowerPoint = 0;
    switch (moving) {
        case "SMA":
            pointEnvelopes = LibIndicators.SMA_noRounding(dataEnvelopes, period);
            break;
        case "EMA":
            pointEnvelopes = LibIndicators.EMA_noRounding(dataEnvelopes, period);
            break;
        default:
            pointEnvelopes = LibIndicators.SMA_noRounding(dataEnvelopes, period);
    }

    for (var i = 0; i < pointEnvelopes.length; i++) {
        middlePoint = pointEnvelopes[i].P;
        upperPoint = middlePoint + (middlePoint * deviation);
        upperPoint = Math.round(upperPoint * 100000) / 100000;
        lowerPoint = middlePoint - (middlePoint * deviation);
        lowerPoint = Math.round(lowerPoint * 100000) / 100000;
        if (isNaN(middlePoint) || isNaN(lowerPoint) || isNaN(upperPoint) || isNaN(pointEnvelopes[i].T)) {
            continue;
        }
        result.push({ T: pointEnvelopes[i].T, M: middlePoint, U: upperPoint, L: lowerPoint });
    }

    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

/*Autor: Sergey Sudakov */
LibIndicators.So = function (data, periodK, periodD) { // Not So Squeezy
    if ((data == null) || (data.length < periodK)) {
        return {};
    }
    var rezult = [];
    var dataSo = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var arrForPoint = [];
    var high = 0;
    var low = 0;
    var current = 0;
    var currentTime = 0;
    var resultCurrent = 0;
    var rezultForCurrent = 0;
    var countPoint = 0;
    var stopPoint = dataSo.length - periodK;
    for (var i = 0; i < dataSo.length; i++) {
        if (countPoint <= stopPoint) {
            arrForPoint = dataSo.slice(i, i + periodK);
            high = Math.max.apply(Math, arrForPoint.map(function (o) { return o.H; }));
            low = Math.min.apply(Math, arrForPoint.map(function (o) { return o.L; }));
            current = arrForPoint[arrForPoint.length - periodK].C;
            currentTime = arrForPoint[arrForPoint.length - periodK].T;
            countPoint++;
        } else {
            if (i == stopPoint) {
                i++;
            }
            current = dataSo[i].C;
            currentTime = dataSo[i].T;
        }
        rezultForCurrent = (current - low) / (high - low) * 100;
        resultCurrent = (high - low) == 0 ? 50 : rezultForCurrent;
        resultCurrent = customRound(resultCurrent);
        rezult.push({ T: currentTime, P: resultCurrent });
    }

    var sumForDpercent = 0.00;
    var percentD = 0;
    var rezultSo = [];
    for (var j = 0; j <= rezult.length - periodD; j++) {
        arrForPoint = rezult.slice(j, j + periodD);
        arrForPoint.forEach(function (val) {
            sumForDpercent += parseFloat(val.P);
        });
        percentD = sumForDpercent / periodD;
        percentD = customRound(percentD);
        if (isNaN(percentD) || isNaN(rezult[j].P) || isNaN(rezult[j].T)) {
            continue;
        }
        rezultSo.push({ T: rezult[j].T, K: rezult[j].P, D: percentD });
        sumForDpercent = 0;
        percentD = 0;
    }
    var dictionary = LibIndicators.toDataDictionary(rezultSo);
    return dictionary;
}

/*Для виджета TechnicalIndicators необходимо доработать индикатор SO
 * Autor: Sergey Sudakov
 */
LibIndicators.SoForK = function (data, periodK) {
    if ((data == null) || (data.length < periodK)) {
        return {};
    }
    var rezult = [];
    var dataSo = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var arrForPoint = [];
    var high = 0;
    var low = 0;
    var current = 0;
    var currentTime = 0;
    var resultCurrent = 0;
    var rezultForCurrent = 0;
    var countPoint = 0;
    var stopPoint = dataSo.length - periodK;
    for (var i = 0; i < dataSo.length; i++) {
        if (countPoint <= stopPoint) {
            arrForPoint = dataSo.slice(i, i + periodK);
            high = Math.max.apply(Math, arrForPoint.map(function (o) { return o.H; }));
            low = Math.min.apply(Math, arrForPoint.map(function (o) { return o.L; }));
            current = arrForPoint[arrForPoint.length - periodK].C;
            currentTime = arrForPoint[arrForPoint.length - periodK].T;
            countPoint++;
        } else {
            if (i == stopPoint) {
                i++;
            }
            current = dataSo[i].C;
            currentTime = dataSo[i].T;
        }
        rezultForCurrent = (current - low) / (high - low) * 100;
        resultCurrent = (high - low) == 0 ? 50 : rezultForCurrent;
        rezult.push({ T: currentTime, P: resultCurrent });
    }
    return rezult;
}

/*Autor: Sergey Sudakov */
LibIndicators.WilliamsR = function (data, period) {
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var rezult = [];
    var dataWilliams = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var arrForPoint = [];
    var high = 0;
    var low = 0;


    var current = 0;
    var currentTime = 0;
    var resultCurrent = 0;
    var countPoint = 0;
    var stopPoint = dataWilliams.length - period;
    for (var i = 0; i < dataWilliams.length; i++) {
        if (countPoint <= stopPoint) {
            arrForPoint = dataWilliams.slice(i, i + period);
            high = Math.max.apply(Math, arrForPoint.map(function (o) { return o.H; }));
            low = Math.min.apply(Math, arrForPoint.map(function (o) { return o.L; }));
            current = arrForPoint[arrForPoint.length - period].C;
            currentTime = arrForPoint[arrForPoint.length - period].T;
            countPoint++;
        } else {
            if (i === stopPoint) {
                i++;
            }
            current = dataWilliams[i].C;
            currentTime = dataWilliams[i].T;
        }
        resultCurrent = ((high - low) == 0) ? 50 : ((high - current) / (high - low) * -100);
        resultCurrent = customRound(resultCurrent);
        if (isNaN(resultCurrent) || isNaN(currentTime)) {
            continue;
        }
        rezult.push({ T: currentTime, P: resultCurrent });
    }
    var dictionary = LibIndicators.toDataDictionary(rezult);
    return dictionary;
}

/*Autor: Sergey Sudakov */
LibIndicators.RSI = function (data, period) { // Индекс относительной силы
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var dataRsi = data.sort(function (a, b) {
        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var result = [];
    var currentTime = 0;
    var closeCurrent = 0;
    var closePrevious = 0;
    var change = [];
    var currentChange = 0;
    var avgGainCurrent = 0;
    var avgLossCurrent = 0;
    var prevavgGainCurrent = 0;
    var prevavgLossCurrent = 0;
    var currentRS = 0;
    var currentRSI = 0;
    for (var i = 1; i < dataRsi.length; i++) {
        closeCurrent = dataRsi[i].C;
        closePrevious = dataRsi[i - 1].C;
        currentTime = dataRsi[i].T;
        change.push({ T: currentTime, C: closeCurrent - closePrevious });
        if (i >= period) {
            avgGainCurrent = 0;
            avgLossCurrent = 0;
            if (i == period) {
                change.forEach(function (val) {
                    currentChange = val.C;
                    currentTime = val.T;
                    if (currentChange > 0) {
                        prevavgGainCurrent += Math.abs(currentChange);
                    } else if (currentChange < 0) {

                        prevavgLossCurrent += Math.abs(currentChange);
                    }
                });
                prevavgGainCurrent = prevavgGainCurrent / period;
                prevavgLossCurrent = prevavgLossCurrent / period;
                currentRS = (prevavgGainCurrent) / (prevavgLossCurrent);
                currentRSI = 100 - (100 / (1 + currentRS));
                currentRSI = customRound(currentRSI);
                result.push(new Object({ "T": dataRsi[i].T, "P": currentRSI }));
            }
            if (i > period) {
                currentChange = change[i - 1].C;
                currentTime = change[i - 1].T;
                if (currentChange > 0) {
                    avgGainCurrent = (prevavgGainCurrent * (period - 1) + Math.abs(currentChange)) / period;
                    avgLossCurrent = (prevavgLossCurrent * (period - 1) + 0) / period;
                } else if (currentChange === 0) {
                    avgLossCurrent = (prevavgLossCurrent * (period - 1) + 0) / period;
                    avgGainCurrent = (prevavgGainCurrent * (period - 1) + 0) / period;
                } else {
                    avgGainCurrent = (prevavgGainCurrent * (period - 1) + 0) / period;
                    avgLossCurrent = (prevavgLossCurrent * (period - 1) + Math.abs(currentChange)) / period;
                }
                currentRS = Math.abs(avgLossCurrent) < 0.00001 ? 0 : avgGainCurrent / avgLossCurrent;
                currentRSI = Math.abs(avgLossCurrent) < 0.00001 ? 100 : 100 - (100 / (1 + currentRS));
                currentRSI = customRound(currentRSI);
                prevavgGainCurrent = avgGainCurrent;
                prevavgLossCurrent = avgLossCurrent;
                if (isNaN(currentRSI) || isNaN(currentTime)) {
                    continue;
                }
                result.push({ T: currentTime, P: currentRSI });
            }
        }
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

/*Autor: Sergey Nikitin */
LibIndicators.BearsPower = function (data, period) {
    if (data.length < period)
        return {};
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });
    var ema = LibIndicators.EMA_noRounding(dataCandles, period);
    var bearsPowerData = [];
    var selectData = [];
    for (var i = 0; i < dataCandles.length; i++) {
        if (dataCandles[i].T >= ema[0]['T']) {
            selectData.push(dataCandles[i]);
        }
    }
    var emaDictionary = LibIndicators.toDataDictionary(ema);
    for (var i = 0; i < selectData.length; i++) {
        var time = selectData[i].T;
        var low = selectData[i].L - emaDictionary[time].P;
        if (isNaN(low) || isNaN(time)) {
            continue;
        }
        bearsPowerData.push({ T: time, P: low });
    }
    var dictionary = LibIndicators.toDataDictionary(bearsPowerData);
    return dictionary;
}

/*Autor: Sergey Nikitin */
LibIndicators.BullsPower = function (data, period) {
    if (data.length < period)
        return {};

    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });
    var ema = LibIndicators.EMA_noRounding(dataCandles, period);
    var bullsPowerData = [];
    var selectData = [];
    for (var i = 0; i < dataCandles.length; i++) {
        if (dataCandles[i].T >= ema[0]['T']) {
            selectData.push(data[i]);
        }
    }
    var emaDictionary = LibIndicators.toDataDictionary(ema);
    for (var i = 0; i < selectData.length; i++) {
        var time = selectData[i].T;
        var high = selectData[i].H - emaDictionary[time].P;
        if (isNaN(high) || isNaN(time)) {
            continue;
        }
        bullsPowerData.push({ T: time, P: high });
    }
    var dictionary = LibIndicators.toDataDictionary(bullsPowerData);
    return dictionary;
}

/*Для виджета TechnicalIndicators необходимо доработать индикатор BullsBearPower
 * Autor: Sergey Sudakov
 */
LibIndicators.BullsBearsPower = function (data, period) {
    if ((data == null) || (data.length < period)) {
        return [];
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });
    var result = [];
    var bearResult = LibIndicators.BearsPower(dataCandles, period);
    var bullsResult = LibIndicators.BullsPower(dataCandles, period);
    var emaResult = LibIndicators.EMA_noRounding(dataCandles, period);
    bearResult = getValuesFromDictionary(bearResult);
    bullsResult = getValuesFromDictionary(bullsResult);
    emaResult = getValuesFromDictionary(emaResult);
    var keys = [];
    for (var i = 0; i < bearResult.length; i++) {
        keys.push(bearResult[i].T);
    }
    keys = keys.sort(function (a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
    if (keys.length < 2) {
        return null;
    }
    var nCurrent = keys[0];
    var nPrevious = keys[1];
    var bearsCurrent = customRound(bearResult[0].P);
    var bullsCurrent = customRound(bullsResult[0].P);
    var emaCurrent = customRound(emaResult[0].P);
    var bearsPrevious = customRound(bearResult[1].P);
    var bullsPrevious = customRound(bullsResult[1].P);
    var emaPrevious = customRound(emaResult[1].P);
    if (bullsCurrent > 0
        && bullsCurrent < bullsPrevious
        && emaCurrent < emaPrevious) {
        result.push({ T: nCurrent, P: -1 });
    }
    else if (bearsCurrent < 0
        && bearsCurrent > bearsPrevious
        && emaCurrent > emaPrevious) {
        result.push({ T: nCurrent, P: 1 });
    }
    else {
        result.push({ T: nCurrent, P: 0 });
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}


/*Autor: Sergey Nikitin */
LibIndicators.ATR = function (data, period) { //  - Average True Range - это показатель волатильности рынка. 
    if (data.length < period) {
        return {};
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) { //сортировка по возрастанию

        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var trueRange = [];
    for (var i = 0; i < period; i++) {
        var high = dataCandles[i].H;
        var low = dataCandles[i].L;
        var trValue = { T: dataCandles[i].T };

        if (i == 0) {
            trValue['P'] = Math.abs(high - low);
            trueRange.push(trValue);
        } else {
            var close = dataCandles[i - 1].C;
            var max = Math.abs(high - low);
            max = Math.max(Math.abs(high - close), max);
            max = Math.max(Math.abs(low - close), max);
            trValue['P'] = max;
            trueRange.push(trValue);
        }
    }
    var dataATR = [];
    var tempAverage = trueRange.reduce(function (p, c) { return p + c.P }, 0) / trueRange.length;
    tempAverage = Math.round(tempAverage * 100000) / 100000;
    dataATR.push({ T: dataCandles[period - 1].T, P: tempAverage });
    for (var i = period; i < dataCandles.length; i++) {
        var time = dataCandles[i].T;
        var high = dataCandles[i].H;
        var low = dataCandles[i].L;
        var close = dataCandles[i - 1].C;
        var max = Math.abs(high - low);
        max = Math.max(Math.abs(high - close), max);
        max = Math.max(Math.abs(low - close), max);
        var value = (dataATR.slice(-1)[0].P * (period - 1) + max) / period;
        value = customRound(value);
        if (isNaN(value) || isNaN(time)) {
            continue;
        }
        dataATR.push({ T: time, P: value });
    }
    var dictionary = LibIndicators.toDataDictionary(dataATR.reverse());
    return dictionary;
}

/*Для виджета TechnicalIndicators необходимо доработать индикатор ATR
 * Autor: Sergey Sudakov
 */
LibIndicators.ATR_Average = function (data, period, countAverage) { // В среднем
    var result = [];
    if ((data == null) || (data.length < period + countAverage)) {
        return {};
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });
    var atr = LibIndicators.ATR(dataCandles, period);
    atr = getValuesFromDictionary(atr);
    for (var i = 0; i < atr.length - countAverage; i++) {
        var average = atr.slice(i, i + countAverage);
        var sumAverage = 0;
        average.forEach(function (val) {
            sumAverage += val.P;
        });
        var averageValue = (sumAverage / countAverage);
        var atrCurrent = atr[i];
        if (atrCurrent.P / 1.2 > averageValue)
            result.push({ T: atrCurrent.T, P: 1 });
        else if (atrCurrent.P * 1.2 < averageValue)
            result.push({ T: atrCurrent.T, P: -1 });
        else
            result.push({ T: atrCurrent.T, P: 0 });
    }
    return result;
}

/*Ichimoku cloud*/
LibIndicators.Ichimoku = function (data, periodSmall, periodMiddle, periodLarge, timePeriod) {
    if (data.length < periodSmall) {
        return {};
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) { //сортировка по возрастанию
        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var ichimokuDictionary = {};
    timePeriod = Math.abs(dataCandles[0].T - dataCandles[1].T);
    //TenkanSentim
    var point;
    var pointTenkanSen;
    var pointKijunSen;
    var pointChinkouSpan;
    var pointSenkouSpanA;
    var timeSenkouSpanA;
    var pointSenkouSpanB;
    var timeSenkouSpanB;
    var time;
    var high;
    var low;
    var countCandles = dataCandles.length;
    for (var i = 0; i < countCandles; i++) {
        high = -Infinity;
        low = Infinity;
        // TenkanSen
        if ((countCandles - i) >= periodSmall) {
            for (var j = 0; j < periodSmall; j++) {
                high = Math.max(high, dataCandles[i + j].H);
                low = Math.min(low, dataCandles[i + j].L);
            }
            pointTenkanSen = (high + low) / 2;
            time = dataCandles[periodSmall - 1 + i].T;
            pointTenkanSen = Math.round(pointTenkanSen * 100000) / 100000;
            if (ichimokuDictionary[time]) {
                ichimokuDictionary[time].TenkanSen = pointTenkanSen;
            } else {
                ichimokuDictionary[time] = { T: time, TenkanSen: pointTenkanSen };
            }
        }
        //KihunSen
        high = -Infinity;
        low = Infinity;
        if ((countCandles - i) >= periodMiddle) {
            for (var k = 0; k < periodMiddle; k++) {
                high = Math.max(high, dataCandles[i + k].H);
                low = Math.min(low, dataCandles[i + k].L);
            }
            pointKijunSen = (high + low) / 2;
            time = dataCandles[periodMiddle - 1 + i].T;
            pointKijunSen = Math.round(pointKijunSen * 100000) / 100000;
            if (ichimokuDictionary[time]) {
                ichimokuDictionary[time].KijunSen = pointKijunSen;
            } else {
                ichimokuDictionary[time] = { T: time, KijunSen: pointKijunSen };
            }
        }
        //ChinkouSpan
        time = i < periodMiddle ? dataCandles[i].T - timePeriod * periodMiddle : dataCandles[i - periodMiddle].T;
        pointChinkouSpan = dataCandles[i].C;
        pointChinkouSpan = Math.round(pointChinkouSpan * 100000) / 100000;
        ichimokuDictionary[time] == undefined ? ichimokuDictionary[time] = { T: time, ChinkouSpan: pointChinkouSpan } : ichimokuDictionary[time].ChinkouSpan = pointChinkouSpan;
        //SenkouSpanA
        if (i >= periodMiddle) {
            time = dataCandles[i].T;
            pointSenkouSpanA = (ichimokuDictionary[time].TenkanSen + ichimokuDictionary[time].KijunSen) / 2;
            pointSenkouSpanA = Math.round(pointSenkouSpanA * 100000) / 100000;
            if (dataCandles[i + periodMiddle]) { // проверить правильно ли попадает время и значение
                timeSenkouSpanA = dataCandles[i + periodMiddle].T;
            } else {
                timeSenkouSpanA = time + timePeriod * periodMiddle;
            }
            ichimokuDictionary[timeSenkouSpanA] == undefined
                ? ichimokuDictionary[timeSenkouSpanA] = { T: timeSenkouSpanA, SenkouSpanA: pointSenkouSpanA }
                : ichimokuDictionary[timeSenkouSpanA].SenkouSpanA = pointSenkouSpanA;
        }
        if ((countCandles - i) >= periodLarge) {
            time = dataCandles[i].T;
            var highSenkouSpanB = -Infinity;
            var lowSenkouSpanB = Infinity;
            for (var h = 0; h < periodLarge; h++) {
                highSenkouSpanB = Math.max(highSenkouSpanB, dataCandles[i + h].H);
                lowSenkouSpanB = Math.min(lowSenkouSpanB, dataCandles[i + h].L);
            }
            pointSenkouSpanB = (highSenkouSpanB + lowSenkouSpanB) / 2;
            pointSenkouSpanB = Math.round(pointSenkouSpanB * 100000) / 100000;

            if (dataCandles[i + periodMiddle + periodLarge - 1]) {
                timeSenkouSpanB = dataCandles[i + periodMiddle + periodLarge - 1].T;
            } else {

                timeSenkouSpanB = dataCandles[countCandles - 1].T + timePeriod * (i + periodMiddle + periodLarge - countCandles);
            }
            if (ichimokuDictionary[timeSenkouSpanB]) {
                ichimokuDictionary[timeSenkouSpanB].SenkouSpanB = pointSenkouSpanB;
            } else {
                ichimokuDictionary[timeSenkouSpanB] = { T: timeSenkouSpanB, SenkouSpanB: pointSenkouSpanB };
            }
        }
    }
    return ichimokuDictionary;
}

/*Autor: Sergey Nikitin */
LibIndicators.Fractal = function (data, period) {
    if (!period) {
        period = 5;
    }
    if (!data || data.length < period) {
        return {};
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) { //сортировка по возрастанию

        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var fractalDictionary = {};
    var indexMiddleCandle = period % 2 == 0 ? (period / 2) - 1 : Math.floor(period / 2);
    for (var i = 0; i < dataCandles.length - period + 1; i++) {
        var currentChain = dataCandles.slice(i, period + i);
        var max = currentChain.reduce(function (prev, curr) { return prev.H > curr.H ? prev : curr });
        var min = currentChain.reduce(function (prev, curr) { return prev.L < curr.L ? prev : curr });
        if (currentChain.indexOf(max) == indexMiddleCandle) {
            fractalDictionary[max.T] = { T: max.T, fractalHigh: max.H };
        }
        if (currentChain.indexOf(min) == indexMiddleCandle) {
            fractalDictionary[min.T] == undefined
                ? fractalDictionary[min.T] = { T: min.T, fractalLow: min.L }
                : fractalDictionary[min.T].fractalLow = min.L;
        }
    }
    return fractalDictionary;
}

/*Autor: Sergey Sudakov */
LibIndicators.ADX = function (data, period) { // индикатор тренда
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var dataAdx = data.sort(function (a, b) {
        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var promArray = [];
    var arrayDX = [];
    var result = [];
    for (var i = 1; i < dataAdx.length; i++) {
        var currentH = dataAdx[i].H;
        var currentL = dataAdx[i].L;
        var previousH = dataAdx[i - 1].H;
        var previousL = dataAdx[i - 1].L;
        var previousC = dataAdx[i - 1].C;
        var currentTime = dataAdx[i].T;
        var tr = Math.max(currentH - currentL, Math.abs(currentH - previousC), Math.abs(currentL - previousC));
        var dmP = 0;
        var dmM = 0;
        if (currentH > previousH) {
            dmP = currentH - previousH;
            dmP = Math.round(dmP * 10000) / 10000;
        } else {
            dmP = 0;
        }
        if (currentL < previousL) {
            dmM = previousL - currentL;
            dmM = Math.round(dmM * 10000) / 10000;
        } else {
            dmM = 0;
        }
        if (dmP > dmM) {
            dmM = 0;
        } else if (dmM > dmP) {
            dmP = 0;
        } else if (dmM == dmP) {
            dmM = 0;
            dmP = 0;
        }
        promArray.push({ T: currentTime, TR: tr, DMP: dmP, DMM: dmM });
        if (i >= period) {
            var previousTR;
            var previousDmP;
            var previousDmM;
            var periodTR = 0;
            var periodDmM = 0;
            var periodDmP = 0;
            var periodDiM = 0;
            var periodDiP = 0;
            var sumDI = 0;
            var diffDI = 0;
            var dx = 0;

            if (i == period) {
                var arrForPoint = promArray.slice(0, period);
                for (var j = 0; j < arrForPoint.length; j++) {
                    periodTR += parseFloat(arrForPoint[j].TR);
                    periodDmP += parseFloat(arrForPoint[j].DMP);
                    periodDmM += parseFloat(arrForPoint[j].DMM);
                }
                previousTR = periodTR;
                previousDmP = periodDmP;
                previousDmM = periodDmM;
                periodDiP = 100 * (periodDmP / periodTR);
                periodDiM = 100 * (periodDmM / periodTR);
                sumDI = periodDiP + periodDiM;
                diffDI = Math.abs(periodDiP - periodDiM);
                dx = 100 * (diffDI / sumDI);
                arrayDX.push({ T: currentTime, DIP: periodDiP, DIM: periodDiM, DISUM: sumDI, DIDIF: diffDI, DX: dx });
            } else if (i > period) {
                periodTR = previousTR - (previousTR / period) + parseFloat(promArray[i - 1].TR);
                periodDmM = previousDmM - (previousDmM / period) + parseFloat(promArray[i - 1].DMM);
                periodDmP = previousDmP - (previousDmP / period) + parseFloat(promArray[i - 1].DMP);
                periodDiP = 100 * (periodDmP / periodTR);
                periodDiM = 100 * (periodDmM / periodTR);
                sumDI = periodDiP + periodDiM;
                diffDI = Math.abs(periodDiP - periodDiM);
                dx = 100 * (diffDI / sumDI);
                arrayDX.push({ T: currentTime, DIP: periodDiP, DIM: periodDiM, DISUM: sumDI, DIDIF: diffDI, DX: dx });
                previousTR = periodTR;
                previousDmP = periodDmP;
                previousDmM = periodDmM;
            }
        }
    }
    var prevAdx = 0;
    var dim;
    var dip;
    var arrForAdx = arrayDX.slice(0, period);
    for (var j = 0; j < arrForAdx.length; j++) {
        prevAdx += parseFloat(arrForAdx[j].DX);
    }
    var adx = prevAdx / period;
    adx = customRound(adx);
    dim = customRound(arrForAdx[period - 1].DIM);
    dip = customRound(arrForAdx[period - 1].DIP);
    result.push({ T: arrForAdx[period - 1].T, DIP: dip, DIM: dim, ADX: adx });
    prevAdx = adx;
    for (var k = period; k < arrayDX.length; k++) {
        adx = ((prevAdx * (period - 1)) + arrayDX[k].DX) / period;
        adx = customRound(adx);
        dim = customRound(arrayDX[k].DIM);
        dip = customRound(arrayDX[k].DIP);
        if (isNaN(adx) || isNaN(dim) || isNaN(dip) || isNaN(arrayDX[k].T)) {
            continue;
        }
        result.push({ T: arrayDX[k].T, DIP: dip, DIM: dim, ADX: adx });
        prevAdx = adx;
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

/*Autor: Sergey Sudakov */
LibIndicators.ADXdiff = function (data, period) {
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var dataAdx = data.sort(function (a, b) {
        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var promArray = [];
    var arrayDX = [];
    var result = [];
    for (var i = 1; i < dataAdx.length; i++) {
        var currentH = dataAdx[i].H;
        var currentL = dataAdx[i].L;
        var previousH = dataAdx[i - 1].H;
        var previousL = dataAdx[i - 1].L;
        var previousC = dataAdx[i - 1].C;
        var currentTime = dataAdx[i].T;
        var tr = Math.max(currentH - currentL, Math.abs(currentH - previousC), Math.abs(currentL - previousC));
        var dmP = 0;
        var dmM = 0;
        if (currentH > previousH) {
            dmP = currentH - previousH;
        } else {
            dmP = 0;
        }
        if (currentL < previousL) {
            dmM = previousL - currentL;
        } else {
            dmM = 0;
        }
        if (dmP > dmM) {
            dmM = 0;
        } else if (dmM > dmP) {
            dmP = 0;
        } else if (dmM == dmP) {
            dmM = 0;
            dmP = 0;
        }
        promArray.push({ T: currentTime, TR: tr, DMP: dmP, DMM: dmM });
        if (i >= period) {
            var previousTR;
            var previousDmP;
            var previousDmM;
            var periodTR = 0;
            var periodDmM = 0;
            var periodDmP = 0;
            var periodDiM = 0;
            var periodDiP = 0;
            var sumDI = 0;
            var diffDI = 0;
            var dx = 0;
            if (i == period) {
                var arrForPoint = promArray.slice(0, period);
                for (var j = 0; j < arrForPoint.length; j++) {
                    periodTR += parseFloat(arrForPoint[j].TR);
                    periodDmP += parseFloat(arrForPoint[j].DMP);
                    periodDmM += parseFloat(arrForPoint[j].DMM);
                }
                previousTR = periodTR;
                previousDmP = periodDmP;
                previousDmM = periodDmM;
                periodDiP = 100 * (periodDmP / periodTR);
                periodDiM = 100 * (periodDmM / periodTR);
                sumDI = periodDiP + periodDiM;
                diffDI = Math.abs(periodDiP - periodDiM);
                dx = 100 * (diffDI / sumDI);
                arrayDX.push({ T: currentTime, DIP: periodDiP, DIM: periodDiM, DISUM: sumDI, DIDIF: diffDI, DX: dx });
            } else if (i > period) {
                periodTR = previousTR - (previousTR / period) + parseFloat(promArray[i - 1].TR);
                periodDmM = previousDmM - (previousDmM / period) + parseFloat(promArray[i - 1].DMM);
                periodDmP = previousDmP - (previousDmP / period) + parseFloat(promArray[i - 1].DMP);
                periodDiP = 100 * (periodDmP / periodTR);
                periodDiM = 100 * (periodDmM / periodTR);
                sumDI = periodDiP + periodDiM;
                //для соответствия старому варианту рекомендации из C#
                diffDI = periodDiP - periodDiM;
                dx = 100 * (diffDI / sumDI);
                arrayDX.push({ T: currentTime, DIP: periodDiP, DIM: periodDiM, DISUM: sumDI, DIDIF: diffDI, DX: dx });
                previousTR = periodTR;
                previousDmP = periodDmP;
                previousDmM = periodDmM;
            }
        }
    }
    return arrayDX;
}

LibIndicators.MACD = function (data, fastLength, slowLength, signal) { // Moving Average Convergence/Divergence — схождение/расхождение скользящих средних
    if (!fastLength || !slowLength || !signal || data.length < slowLength) {
        return {};
    }
    var dataCandles = Object.assign(data);
    dataCandles = dataCandles.sort(function (a, b) { return a.T - b.T });  //начало масива - начало данных истории свечей
    var macdDictionary = {};   //{T:value,  macdLine:value,  signalLIne:value,  histogram:value}
    var emaFast = LibIndicators.EMA_noRounding(dataCandles, fastLength);
    var emaSlow = LibIndicators.EMA_noRounding(dataCandles, slowLength);
    emaFast = LibIndicators.toDataDictionary(emaFast);
    emaSlow = LibIndicators.toDataDictionary(emaSlow);
    //macdLine
    for (var slow in emaSlow) {
        var time = emaSlow[slow].T;
        var value = emaFast[time].P - emaSlow[slow].P;
        macdDictionary[time] = { T: time, macdLine: value, signalLine: 0, histogram: 0 }
    }
    //signalLine & macdHistogram
    var tempCandles = [];
    for (var key in macdDictionary) {
        var timeEma = parseInt(key);
        tempCandles.push({
            T: timeEma,
            O: 0,
            H: 0,
            L: 0,
            C: macdDictionary[key].macdLine
        });
    };
    var signalLines = LibIndicators.EMA_noRounding(tempCandles, signal);
    signalLines = LibIndicators.toDataDictionary(signalLines);
    //signalLines.forEach(function (pair) {
    for (var sLine in signalLines) {
        var timeSline = parseInt(sLine);
        macdDictionary[timeSline].signalLine = signalLines[timeSline].P;
        macdDictionary[timeSline].histogram = macdDictionary[timeSline].macdLine - signalLines[timeSline].P;
    }
    return macdDictionary;
}

LibIndicators.Dema = function (dataDema, period) { // DEMA (i) = 2 * EMA (i) – EMA (EMA (i))
    if ((dataDema == null) || (dataDema.length < period)) {
        return {};
    }
    dataDema = dataDema.sort(function (a, b) {
        if (a.T < b.T) return -1;
        if (a.T > b.T) return 1;
        return 0;
    });
    var firstEma = LibIndicators.EMA_noRounding(dataDema, period);
    var tempCandles = [];
    var result = [];

    for (var i = 0; i < firstEma.length; i++) {
        tempCandles.push({
            T: firstEma[i].T,
            O: 0,
            H: 0,
            L: 0,
            C: firstEma[i].P
        });
    };
    var secondEma = LibIndicators.EMA_noRounding(tempCandles, period);
    for (var i = 0; i < secondEma.length; i++) {
        var one = firstEma[i + period - 1].P;
        var two = secondEma[i].P;
        var dema = 2 * one - two;
        result.push({ T: secondEma[i].T, P: dema });
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

/*Autor: Sergey Sudakov */
LibIndicators.ParabolicSar = function (data, startAf, stepAf, maxAf) { // SAR – Stop and Reverse
    if (data.length < 3) {
        return {};
    }
    if (!startAf) {
        startAf = 0.02;
    } else {
        startAf = startAf / 100;
    }
    if (!stepAf) {
        stepAf = 0.02;
    } else {
        stepAf = stepAf / 100;
    }
    if (!maxAf) {
        maxAf = 0.2;
    } else {
        maxAf = maxAf / 100;
    }
    var dataCandles = Object.assign(data);
    var qList = dataCandles.sort(function (a, b) { //сортировка по возрастанию
        if (a.T > b.T) return 1;
        if (a.T < b.T) return -1;
        return 0;
    });
    var res = {};
    var resItog = {}; //{T:value,  sar:value}
    var direction = true;
    var diffprev = 0.00;
    res[qList[3].T] = { T: qList[3].T, P: 0.00, EP: 0.00, ST: 0.00, D: true }
    if (direction) {
        direction = qList[4].L > Math.min(qList[4].L, qList[3].L, qList[2].L, qList[1].L, qList[0].L);
    } else {
        direction = qList[4].H >= Math.min(qList[4].L, qList[3].L, qList[2].L, qList[1].L, qList[0].L);
    }
    res[qList[4].T] = { T: qList[4].T, P: Math.min(qList[4].L, qList[3].L, qList[2].L, qList[1].L, qList[0].L), EP: Math.max(qList[4].H, qList[3].H, qList[2].H, qList[1].H, qList[0].H), ST: startAf, D: direction }
    resItog[qList[4].T] = { T: qList[4].T, P: res[qList[4].T].P };
    for (var i = 5; i < qList.length - 1; i++) {
        res[qList[i].T] = { T: qList[i].T, P: 0.00, EP: 0.00, ST: 0.00, D: true }
        if (res[qList[i - 1].T].D == res[qList[i - 2].T].D) { //направление одинаковое
            if (res[qList[i - 1].T].D) { // направление UP
                //расчет EP
                if (qList[i].H > res[qList[i - 1].T].EP) {
                    res[qList[i].T].EP = qList[i].H;
                } else {
                    res[qList[i].T].EP = res[qList[i - 1].T].EP;
                }
                //--------------------
                //расчет SAR
                diffprev = res[qList[i - 1].T].ST * (res[qList[i - 1].T].EP - res[qList[i - 1].T].P);
                if ((res[qList[i - 1].T].P + diffprev) < Math.min(qList[i - 1].L, qList[i - 2].L)) {
                    res[qList[i].T].P = res[qList[i - 1].T].P + diffprev;
                } else {
                    res[qList[i].T].P = Math.min(qList[i - 1].L, qList[i - 2].L);
                }
                //--------------------
                //расчет AF 
                if (res[qList[i].T].EP > res[qList[i - 1].T].EP) {
                    if (res[qList[i - 1].T].ST >= maxAf) {
                        res[qList[i].T].ST = maxAf;
                    } else {
                        res[qList[i].T].ST = res[qList[i - 1].T].ST + stepAf;
                    }
                } else {
                    res[qList[i].T].ST = res[qList[i - 1].T].ST;
                }
                //--------------------
                //определяем направление
                res[qList[i].T].D = (qList[i + 1].L > res[qList[i].T].P);
            } else { // направление DOWN
                //расчет EP
                res[qList[i].T].EP = Math.min(qList[i].L, res[qList[i - 1].T].EP);
                //--------------------
                //расчет SAR
                diffprev = res[qList[i - 1].T].ST * (res[qList[i - 1].T].EP - res[qList[i - 1].T].P);
                if ((res[qList[i - 1].T].P + diffprev) > Math.max(qList[i - 1].H, qList[i - 2].H)) {
                    res[qList[i].T].P = res[qList[i - 1].T].P + diffprev;
                } else {
                    res[qList[i].T].P = Math.max(qList[i - 1].H, qList[i - 2].H);
                }
                //--------------------
                //расчет AF 
                if (res[qList[i].T].EP < res[qList[i - 1].T].EP) {
                    if (res[qList[i - 1].T].ST >= maxAf) {
                        //res[qList[i].T].ST = res[qList[i - 1].T].ST;
                        res[qList[i].T].ST = maxAf;
                    } else {
                        res[qList[i].T].ST = res[qList[i - 1].T].ST + stepAf;
                    }
                } else {
                    res[qList[i].T].ST = res[qList[i - 1].T].ST;
                }
                //--------------------
                //определяем направление
                res[qList[i].T].D = qList[i + 1].H >= res[qList[i].T].P;
            }
        } else { // направление изменилось
            res[qList[i].T].P = res[qList[i - 1].T].EP; // когда изменилось направление SAR равно предыдущему EP
            res[qList[i].T].ST = stepAf; // когда изменилось направление step сбрасываем к начальному
            if (res[qList[i - 1].T].D) { // направление UP
                //расчет EP
                if (qList[i].H > res[qList[i - 1].T].EP) {
                    res[qList[i].T].EP = qList[i].H;
                } else {
                    res[qList[i].T].EP = res[qList[i - 1].T].EP;
                }
                res[qList[i].T].D = (qList[i + 1].L > res[qList[i].T].P);
            } else {
                if (qList[i].L < res[qList[i - 1].T].EP) {
                    res[qList[i].T].EP = qList[i].L;
                } else {
                    res[qList[i].T].EP = res[qList[i - 1].T].EP;
                }
                res[qList[i].T].D = qList[i + 1].H >= res[qList[i].T].P;
            }
        }
        if (isNaN(res[qList[i].T].P) || isNaN(qList[i].T)) {
            continue;
        }
        resItog[qList[i].T] = { T: qList[i].T, P: res[qList[i].T].P };

    }
    return resItog;
}

LibIndicators.Keltner = function (data, period, deviation, param) {
    if ((data == null) || (data.length < period)) {
        return {};
    }
    // data - свечи
    // period  - период сглаживания
    //deviation - расстояние для верхней и нижней линий
    // param тип расчета средней SMA EMA

    if (!deviation) {
        deviation = 1;
    }
    if (!param) {
        param = "EMA";
    }
    var result = [];
    var pointKeltner = 0;
    var middlePoint = 0;
    var upperPoint = 0;
    var lowerPoint = 0;
    var dataKeltner = data;

    switch (param) {
        case "SMA":
            pointKeltner = LibIndicators.SMA_noRounding(dataKeltner, period);
            break;
        case "EMA":
            pointKeltner = LibIndicators.EMA_noRounding(dataKeltner, period);
            break;
        default:
            pointKeltner = LibIndicators.EMA_noRounding(dataKeltner, period);
            break;
    }
    var pointForUpLOw = LibIndicators.ATR(dataKeltner, 10); // proverit
    for (var i = 0; i < pointKeltner.length; i++) {
        middlePoint = pointKeltner[i].P;
        middlePoint = Math.round(middlePoint * 100000) / 100000;
        upperPoint = middlePoint + (deviation * pointForUpLOw[pointKeltner[i].T].P);
        upperPoint = Math.round(upperPoint * 100000) / 100000;
        lowerPoint = middlePoint - (deviation * pointForUpLOw[pointKeltner[i].T].P);
        lowerPoint = Math.round(lowerPoint * 100000) / 100000;
        result.push({ T: pointKeltner[i].T, M: middlePoint, U: upperPoint, L: lowerPoint });
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

LibIndicators.Donchian = function (data, period) {
    // data - свечи
    // period  - период поиска минимума и максимума
    if ((data == null) || (data.length < period)) {
        return {};
    }
    var dataDonchian = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var result = [];

    for (var j = 0; j < dataDonchian.length - period; j++) {
        var high = -Infinity;
        var low = Infinity;
        for (var k = 0; k < period; k++) {
            high = Math.max(high, dataDonchian[j + k].H);
            low = Math.min(low, dataDonchian[j + k].L);
        }
        var middle = (high + low) / 2;
        result.push({ T: dataDonchian[j].T, M: middle, U: high, L: low });
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

LibIndicators.AO = function (data) { // Awesome Oscillator (AO) – чудесный осциллятор, как его называл автор Билл Вильямс
    if ((data == null) || (data.length < 5)) {
        return {};
    }
    // data - свечи
    var dataAo = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var result = [];
    var tempCandles = [];

    for (var i = 0; i < dataAo.length; i++) {
        tempCandles.push({
            T: dataAo[i].T,
            O: 0,
            H: 0,
            L: 0,
            C: ((dataAo[i].H + dataAo[i].L) / 2)
        });
    }
    var smaOne = LibIndicators.SMA_noRounding(tempCandles, 5);
    var smaTwo = LibIndicators.SMA_noRounding(tempCandles, 34);
    smaOne = LibIndicators.toDataDictionary(smaOne);
    smaTwo = LibIndicators.toDataDictionary(smaTwo);

    for (var key in smaTwo) {
        var tt = smaTwo[key].T;
        var tp = smaTwo[key].P;
        var ao = smaOne[key].P - tp;
        result.push({ T: tt, P: ao });
    }
    var dictionary = LibIndicators.toDataDictionary(result);
    return dictionary;
}

LibIndicators.AC = function (data) { // Индикатор Accelerator/Decelerator
    if ((data == null) || (data.length < 5)) {
        return {};
    }
    // data - свечи
    var dataAo = data.sort(function (a, b) {
        if (a.T < b.T) return 1;
        if (a.T > b.T) return -1;
        return 0;
    });
    var res = [];
    var dictAo = LibIndicators.AO(dataAo);
    var dictAoArr = getValuesFromDictionary(dictAo);
    var tempCandles = [];
    for (var i = 0; i < dictAoArr.length; i++) {
        tempCandles.push({
            T: dictAoArr[i].T,
            O: 0,
            H: 0,
            L: 0,
            C: dictAoArr[i].P
        });
    }
    var smaAc = LibIndicators.SMA_noRounding(tempCandles, 5);
    for (var key in smaAc) {
        var t = smaAc[key].T;
        var p = smaAc[key].P;
        var ac = dictAoArr[key].P - p;
        res.push({ T: t, P: ac });
    }
    var dictionaryAC = LibIndicators.toDataDictionary(res);
    return dictionaryAC;
}


function getValuesFromDictionary(dic) {
    var res = Object.values(dic).sort(function (a, b) {
        if (a.T > b.T) return -1;
        if (a.T < b.T) return 1;
        return 0;
    });;
    return res;
}

function customRound(value, count) {
    count = (count == undefined) ? 16 : count;
    return parseFloat(value.toString().slice(0, count - 1));
}
