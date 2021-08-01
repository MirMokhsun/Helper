import { returnCountriesLocalization } from "../../../../app/api/setCountryName/setCountryName";

describe('Test returnCountriesLocalization', () => {
    test("returnCountriesLocalization('ru')", () => {
        const wrapper = returnCountriesLocalization('ru');
        expect(wrapper.AD).toEqual({ "countryName": "Андорра", "phcode": "376" });
    });
    /*test("returnCountriesLocalization('es')", () => {
        const wrapper = returnCountriesLocalization('es');
        expect(wrapper.UA).toEqual({ "countryName": "Ucrania", "phcode": "380" });
    });*/
    test("returnCountriesLocalization('en')", () => {
        const wrapper = returnCountriesLocalization('en');
        expect(wrapper.AD).toEqual({ "countryName": "Andorra", "phcode": "376" });
    });
    /*test("returnCountriesLocalization('ar')", () => {
        const wrapper = returnCountriesLocalization('ar');
        expect(wrapper.AD).toEqual({ "countryName": "أندورا", "phcode": "376" });
    });*/
    test("returnCountriesLocalization(null)", () => {
        const wrapper = returnCountriesLocalization(null);
        expect(wrapper.AD).toEqual({ "countryName": "Andorra", "phcode": "376" });
    });
});