export const getNamberLength = (number) => {
    let result;
    if (!number) {
        result = 0;
    } else {
        result = number.toString().length;
    }
    return result;
}

export const getStringFromNumberWithLength = (number, length) => {
    let result;
    if (!number && !length) {
        result = '';
    } else {
        const strinig = number.toString();
        result = strinig.substring(0, length)
    }
    return result;
}