import { countriesru } from '../../common/countries/countries_ru';
import { countrieses } from '../../common/countries/countries_es';
import { countriesar } from '../../common/countries/countries_ar';
import { countriesen } from '../../common/countries/countries_en';

export const returnCountriesLocalization = (languageName) => {
    let lang = null;
    switch (languageName) {
        case 'ru':
            lang = countriesru;
            break;
        case 'en':
            lang = countriesen;
            break;
        case 'es':
            lang = countrieses;
            break;
        case 'ar':
            lang = countriesen;
            break;
        default:
            lang = countriesen;
    }
    return lang;
}

export const setCountry = (countryKey, languageName) => {
    if (countryKey) {
        const objectsCountry = returnCountriesLocalization(languageName);
        const { countryName } = objectsCountry[countryKey];
        return countryName;
    }
}

