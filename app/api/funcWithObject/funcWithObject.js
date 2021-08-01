export const returnObjectLength = (obj) => {
    let result = 0;
    if (typeof obj === "object") {
        result = Object.keys(obj).length;
    }
    return result;
}