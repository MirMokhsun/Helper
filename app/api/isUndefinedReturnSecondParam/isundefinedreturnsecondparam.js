export const isUndefinedReturnSecondParam = (params, firstParamName, secondParam) => {
    if (!params){
        return secondParam;
    }
    return params[firstParamName] ? params[firstParamName] : secondParam;
}