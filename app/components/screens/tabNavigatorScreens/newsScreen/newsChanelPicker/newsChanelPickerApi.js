export function getMaxHeightDependOnLanguage(language) {
    let result = null;
    switch (language) {
        case 'ru':
            result = 165;
            break;
        case 'ar':
            result = 90;
            break;
        case 'es':
            result = 120;
            break;
        case 'en':
            result = 120;
            break;
    }
    return result;
}

export function setTitleInConstructor(title) {
    let result = null;
    switch (title) {
        case 'umarkets':
            result = 'UMarketsnews.com';
            break;
        case 'finversia':
            result = 'MSNfinance.com';
            break;
        case 'analytics':
            result = 'Investing.com';
            break;
    }
    return result;
}