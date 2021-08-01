import React from 'react';
import { Text } from 'react-native';

export const getCamelPos = (str) => {
    let pos;
    if (!str) {
        return 0;
    }
    const decSep = str.includes(".") ? "." : ",";
    const dotPos = str.indexOf(decSep);
    if (dotPos === -1) {
        pos = str.length - 3;
    }
    else if (dotPos === str.length - (1 + decSep.length)) {
        pos = dotPos - 2;
    }
    else if (dotPos === str.length - (2 + decSep.length)) {
        pos = dotPos + decSep.length;
    }
    else {
        pos = str.length - 3;
    }
    return pos >= 0 ? pos : 0;
}

export const isEqualNumb = (currentNumb, nextNumb) => {
    let compare = false;
    if (currentNumb && nextNumb) {
        compare = parseFloat(currentNumb) < parseFloat(nextNumb);
    }
    return compare;
}
export const getArrayWithCamelCase = (_arrayChars, posStartCamelCase, posEndCamelCase) => {
    const numbersObj = {};
    if (_arrayChars) {
        numbersObj.smallTo = _arrayChars.slice(0, posStartCamelCase);
        numbersObj.large = _arrayChars.slice(posStartCamelCase, posEndCamelCase);
        if (posEndCamelCase < _arrayChars.length) {
            numbersObj.smalllater = _arrayChars.slice(posEndCamelCase, _arrayChars.length);
        }
    }
    return numbersObj;
}
export const getRenderNumber = (numbersObj, colorNumbers, styles) => {
    const rendersNumb = Object.keys(numbersObj).map((key, i) => {
        if (key === "large") {
            return <Text key={i} style={[colorNumbers, styles.largeNumbers]}>{numbersObj[key]}</Text>;
        }
        return <Text key={i} style={[colorNumbers, styles.valuestyle]}>{numbersObj[key]}</Text>;
    });
    return rendersNumb;
}
export const setCamelPos = (str, colorNumbers, countUperNambers, styles) => {
    const posStartCamelCase = getCamelPos(str);
    const posEndCamelCase = posStartCamelCase + countUperNambers;
    const _arrayChars = str.split('');
    const numbersObj = getArrayWithCamelCase(_arrayChars, posStartCamelCase, posEndCamelCase);
    return getRenderNumber(numbersObj, colorNumbers, styles);
}
