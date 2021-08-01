import LibIndicators from './LibIndicators';

export default function IndicatorRecommendation() { }

function getValuesFromDictionary(dic) {
  var res = Object.values(dic).sort(function (a, b) {
    if (a.T > b.T) return -1;
    if (a.T < b.T) return 1;
    return 0;
  });;
  return res;
}

function actionSMAEMA(values) {
  values = getValuesFromDictionary(values);
  if (values.length < 2) {
    return ("Undefined");
  }
  // values.sort((a, b) => b.T - a.T);
  values = Object.values(values).sort(function (a, b) {
    if (a.T > b.T) return -1;
    if (a.T < b.T) return 1;
    return 0;
  });
  var prevVal = values[1].P;
  var curVal = values[0].P;
  if (curVal > prevVal) {
    return ("Buy");
  }
  else if (curVal === prevVal) {
    return ("Neutral");
  }
  else if (curVal < prevVal) {
    return ("Sell");
  }
  else {
    return ("Undefined");
  }
}

function getOneValues(values) {
  var result = [];
  //values.sort((a, b) => b.T - a.T);
  values = Object.values(values).sort(function (a, b) {
    if (a.T > b.T) return -1;
    if (a.T < b.T) return 1;
    return 0;
  });
  result[0] = values[0];
  return result[0];
}

IndicatorRecommendation.SMA = IndicatorRecommendation.EMA = function (values) {
  return actionSMAEMA(values);
}

IndicatorRecommendation.RSI = function (values) {
  values = getValuesFromDictionary(values);
  var result = Math.abs(values[values.length - 1].P);
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < 0 || result > 100) { return ("undefined"); }
  else if (result >= 0 && result < 10) { return ("Buy"); }
  else if (result >= 10 && result < 30) { return ("Oversold"); }
  else if (result >= 30 && result < 40) { return ("Sell"); }
  else if (result >= 40 && result < 60) { return ("Neutral"); }
  else if (result >= 60 && result < 70) { return ("Buy"); }
  else if (result >= 70 && result < 90) { return ("Overbought"); }
  else if (result >= 90 && result <= 100) { return ("Sell"); }
  else { return ("Neutral"); }
  //{ return ("undefined"); } надо продумать обработку данных для индикатора когда приходят одинаковые данные и на выходе получаем NAN
}

IndicatorRecommendation.So = function (values) {
  values = getValuesFromDictionary(values);
  var result = Math.abs(values[0].P);
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < 0 || result > 100) { return ("undefined"); }
  else if (result >= 0 && result < 5) { return ("Buy"); }
  else if (result >= 5 && result < 20) { return ("Oversold"); }
  else if (result >= 20 && result < 40) { return ("Sell"); }
  else if (result >= 40 && result < 60) { return ("Neutral"); }
  else if (result >= 60 && result < 80) { return ("Buy"); }
  else if (result >= 80 && result < 95) { return ("Overbought"); }
  else if (result >= 95 && result <= 100) { return ("Sell"); }
  else { return ("Neutral"); }
}

IndicatorRecommendation.WilliamsR = function (values) {
  values = getValuesFromDictionary(values);
  var result = Math.abs(values[0].P);
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < 0 || result > 100) { return ("undefined"); }
  else if (result >= 0 && result < 5) { return ("Sell"); }
  else if (result >= 5 && result < 20) { return ("Overbought"); }
  else if (result >= 20 && result < 80) { return ("Neutral"); }
  else if (result >= 80 && result < 95) { return ("Oversold"); }
  else if (result >= 95 && result <= 100) { return ("Buy"); }
  else { return ("Neutral"); }
}

IndicatorRecommendation.ATR_Average = function (values) {
  values = getValuesFromDictionary(values);
  var result = values[values.length - 1].P;
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < -1 || result > 1) { return ("undefined"); }

  else if (result === -1) { return ("LowVolatility"); }

  else if (result === 0) { return ("Neutral"); }

  else if (result === 1) { return ("HighVolatility"); }

  return ("undefined");
}

IndicatorRecommendation.ADX = function (values) {
  values = getValuesFromDictionary(values);
  var result = values[0].P;
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < 0) { return ("Sell"); }
  else if (result === 0) { return ("Neutral"); }
  else if (result > 0) { return ("Buy"); }
  else { return ("Neutral"); }
  //{ return ("undefined"); } надо продумать обработку данных для индикатора когда приходят одинаковые данные и на выходе получаем NAN
}


IndicatorRecommendation.BullsBearsPower = function (values) {
  values = getValuesFromDictionary(values);
  var result = values[values.length - 1].P;
  if (values.length > 1) {
    result = getOneValues(values).P;
  }
  if (result < -1 || result > 1) { return ("Undefined"); }
  else if (result === -1) { return ("Sell"); }
  else if (result === 0) { return ("Neutral"); }
  else if (result === 1) { return ("Buy"); }
  return ("Undefined");
}

IndicatorRecommendation.getDataForTechnicalSummary = function (data, arrayindicators, isCountPivot) {
  // для проверки данных каждый индикатор вызывается индивидуально, чтобы проверить работу библиотек индикаторов и рекомендации
  var result = [];
  var countMaBuy = 0;
  var countMaSell = 0;
  var countNeutral = 0;
  var countBuy = 0;
  var countSell = 0;
  var countOverbought = 0;
  var countOversold = 0;
  var summary = "Error";
  var average = 0.00;
  if (data.length !== 0) {
    arrayindicators = IndicatorRecommendation.dataTechnicalSummary(data, isCountPivot);
  }
  for (var j = 0; j < arrayindicators.length; j++) {
    if (arrayindicators[j].Key.includes("SMA") || arrayindicators[j].Key.includes("EMA")) {
      if (arrayindicators[j].VAL.includes("Buy")) {
        countMaBuy++;
      } else if (arrayindicators[j].VAL.includes("Sell")) {
        countMaSell++;
      } else if (arrayindicators[j].VAL.includes("Neutral")) {
        countNeutral++;
      }
    } else {
      if (arrayindicators[j].VAL.includes("Buy")) {
        countBuy++;
      } else if (arrayindicators[j].VAL.includes("Sell")) {
        countSell++;
      } else if (arrayindicators[j].VAL.includes("Overbought")) {
        countOverbought++;
      } else if (arrayindicators[j].VAL.includes("Oversold")) {
        countOversold++;
      } else if (arrayindicators[j].VAL.includes("Neutral")) {
        countNeutral++;
      }
    }
  }
  average = ((countSell + countMaSell) * 1 + countNeutral * 3 + (countBuy + countMaBuy) * 5) /
    ((countSell + countMaSell) + countNeutral + (countBuy + countMaBuy));
  if (average < 1.25) {
    summary = "StrongSell";
  }
  else if (average <= 2.25) {
    summary = "Sell";
  }
  else if (average < 3.75) {
    summary = "Neutral";
  }
  else if (average <= 4.75) {
    summary = "Buy";
  }
  else if (average > 4.75) {
    summary = "StrongBuy";
  }

  result.push({ BuyMA: countMaBuy, SellMA: countMaSell, Buy: countBuy, Sell: countSell, Summary: summary });
  return result;
}

IndicatorRecommendation.dataSma = function (data, isCountPivot) {
  var period = [5, 9, 14];
  var promRez = [];
  var result = [];

  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.SMA(data, period[i], isCountPivot);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    prevKey = res[1].T;
    prevVal = res[1].P;
    promRez.push({ T: prevKey, P: prevVal });
    var recomendation = IndicatorRecommendation.SMA(promRez);
    var nameInd = "SMA" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataEma = function (data, isCountPivot) {
  var period = [5, 9, 14];
  var promRez = [];
  var result = [];

  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.EMA(data, period[i], isCountPivot);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    prevKey = res[1].T;
    prevVal = res[1].P;
    promRez.push({ T: prevKey, P: prevVal });
    var recomendation = IndicatorRecommendation.EMA(promRez);
    var nameInd = "EMA" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataRSI = function (data) {
  var period = [14];
  var promRez = [];
  var result = [];

  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.RSI(data, period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.RSI(promRez);
    var nameInd = "RSI" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataSO = function (data) {
  var period = [9];
  var promRez = [];
  var result = [];
  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.So(data, period[i], period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].K;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.So(promRez);
    var nameInd = "SO" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataWilliamsR = function (data) {
  var period = [14];
  var promRez = [];
  var result = [];
  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.WilliamsR(data, period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.WilliamsR(promRez);
    var nameInd = "WilliamsR" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataATR_Average = function (data) {
  var period = [14];
  var promRez = [];
  var result = [];
  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.ATR_Average(data, period[i], period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.ATR_Average(promRez);
    var nameInd = "ATR" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataADX = function (data) {
  var period = [14];
  var promRez = [];
  var result = [];
  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.ADX(data, period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].ADX;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.ADX(promRez);
    var nameInd = "ADX" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataBullsBearsPower = function (data) {
  var period = [14];
  var promRez = [];
  var result = [];
  for (var i = 0; i < period.length; i++) {
    var res = LibIndicators.BullsBearsPower(data, period[i]);
    res = getValuesFromDictionary(res);
    curKey = res[0].T;
    curVal = res[0].P;
    promRez.push({ T: curKey, P: curVal });
    var recomendation = IndicatorRecommendation.ADX(promRez);
    var nameInd = "Bull/Bear Power" + period[i];
    result.push({ Key: nameInd, VAL: recomendation });
    promRez = [];
  }
  return result;
}

IndicatorRecommendation.dataTechnicalSummary = function (data, isCountPivot) {
  var result = [];

  var dSma = IndicatorRecommendation.dataSma(data, isCountPivot);
  var i;
  for (i = 0; i < dSma.length; i++) {
    result.push({ Key: dSma[i].Key, VAL: dSma[i].VAL });
  }

  var dEma = IndicatorRecommendation.dataEma(data, isCountPivot);
  for (i = 0; i < dEma.length; i++) {
    result.push({ Key: dEma[i].Key, VAL: dEma[i].VAL });
  }
  var dRsi = IndicatorRecommendation.dataRSI(data);
  for (i = 0; i < dRsi.length; i++) {
    result.push({ Key: dRsi[i].Key, VAL: dRsi[i].VAL });
  }
  var dSo = IndicatorRecommendation.dataSO(data);
  for (i = 0; i < dSo.length; i++) {
    result.push({ Key: dSo[i].Key, VAL: dSo[i].VAL });
  }
  var dWilliamsR = IndicatorRecommendation.dataWilliamsR(data);
  for (i = 0; i < dWilliamsR.length; i++) {
    result.push({ Key: dWilliamsR[i].Key, VAL: dWilliamsR[i].VAL });
  }
  var dAtr = IndicatorRecommendation.dataATR_Average(data);
  for (i = 0; i < dAtr.length; i++) {
    result.push({ Key: dAtr[i].Key, VAL: dAtr[i].VAL });
  }
  var dAdx = IndicatorRecommendation.dataADX(data);
  for (i = 0; i < dAdx.length; i++) {
    result.push({ Key: dAdx[i].Key, VAL: dAdx[i].VAL });
  }
  var dBullsBearsPower = IndicatorRecommendation.dataBullsBearsPower(data);
  for (i = 0; i < dBullsBearsPower.length; i++) {
    result.push({ Key: dBullsBearsPower[i].Key, VAL: dBullsBearsPower[i].VAL });
  }

  return result;

}

IndicatorRecommendation.getDataPivot = function (data) {
  if (data.length === 0 || data === null) {
    return [];
  }
  data = Object.values(data).sort(function (a, b) {
    if (a.T > b.T) return -1;
    if (a.T < b.T) return 1;
    return 0;
  });
  var dataPivot = data[0];
  var result = [];
  var precession = getMaxPrecission(dataPivot);
  var pivot = parseFloat((dataPivot.H + dataPivot.L + dataPivot.C) / 3).toFixed(precession);
  var r1 = parseFloat((2 * pivot - dataPivot.L)).toFixed(precession);
  var s1 = parseFloat((2 * pivot - dataPivot.H)).toFixed(precession);
  var r2 = parseFloat((parseFloat(pivot) + (r1 - s1))).toFixed(precession);
  var s2 = parseFloat((pivot - (r1 - s1))).toFixed(precession);
  var r3 = parseFloat((dataPivot.H + 2 * (pivot - dataPivot.L))).toFixed(precession);
  var s3 = parseFloat((dataPivot.L - 2 * (dataPivot.H - pivot))).toFixed(precession);
  result.push({ Pivot: pivot, R1: r1, S1: s1, R2: r2, S2: s2, R3: r3, S3: s3 });

  return result;
}

function getMaxPrecission(data) {
  if (data.length === 0 || data === null) {
    return 0;
  }
  var max = 0;
  var strH = 0;
  var strO = 0;
  var strL = 0;
  var strC = 0;

  if ((data.H + "").split('.')[1]) {
    strH = (data.H + "").split('.')[1].length;
  }
  if ((data.O + "").split('.')[1]) {
    strO = (data.O + "").split('.')[1].length;
  }
  if ((data.L + "").split('.')[1]) {
    strL = (data.L + "").split('.')[1].length;
  }
  if ((data.C + "").split('.')[1]) {
    strC = (data.C + "").split('.')[1].length;
  }

  if (max < strH) {
    max = strH;
  }
  if (max < strO) {
    max = strO;
  }
  if (max < strL) {
    max = strL;
  }
  if (max < strC) {
    max = strC;
  }
  return max;
}