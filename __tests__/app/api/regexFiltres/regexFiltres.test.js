import { validationTest } from "../../../../app/api/regexFilters/validationInput";
import { filterPhone, filterName, filterEmail, filterPassword } from "../../../../app/api/regexFilters/regexFilters";

describe('Test filerName ', () => {
    it('test check names with valid data', () => {
        let validName = ["I", "I am", "we", "s'd", "Ivan-ivanovich", "BuDuLaI"];
        validName.forEach(name => {
            let result = validationTest(name, filterName);
            expect(result).toEqual(true);
        });
    });
    it('test check names with invalid data', () => {
        let invalidName = ["", "-g",
            "t ", " test123@.com", "test123@.com.com'",
            "'.test@test.com", "#gf", "test@%*.com",
            "-tesmail.c-om-", "-testco-m"];
        invalidName.forEach(name => {
            let result = validationTest(name, filterName);
            expect(result).toEqual(false);
        });
    });

    it('test check filterEmail with valid data', () => {
        let invalidName = ["test123@test.com", "test123@com.com",
            "tfghfghfghest@test.com"];
        invalidName.forEach(name => {
            let result = validationTest(name, filterEmail);
            expect(result).toEqual(true);
        });
    });
    it('test check filterEmail with invalid data', () => {
        let invalidName = ["", "-g",
            "t ", " test123@.com", "test123@.com.com'",
            "#gf", "test@%*.com",
            "-tesmail.c-om-", "-testco-m"];
        invalidName.forEach(name => {
            let result = validationTest(name, filterEmail);
            expect(result).toEqual(false);
        });
    });

    it("test check phone with valid data", () => {
        let validPhone = ["+380631234567", "+38(063)1234567", "+38(063)12-34-567", "38(063)1234567", "380631234567", "12345678901234567"];
        validPhone.forEach(phone => {
            let result = validationTest(phone, filterPhone);
            expect(result).toEqual(true);
        });
    });
    it("test check phone with invalid data", () => {
        let invalidPhone = ["", "332", "32132", "ssdsds", "12345678901234567890123456789"];
        invalidPhone.forEach(phone => {
            let result = validationTest(phone, filterPhone);
            expect(result).toEqual(false);
        });
    });

    it("test check filterPassword with valid data", () => {
        let validPhone = ["0631234567", "sdf4567", "ZdfgJ15"];
        validPhone.forEach(phone => {
            let result = validationTest(phone, filterPassword);
            expect(result).toEqual(true);
        });
    });
    it("test check filterPassword with invalid data", () => {
        let invalidPhone = ["", "332", "32132"];
        invalidPhone.forEach(phone => {
            let result = validationTest(phone, filterPassword);
            expect(result).toEqual(false);
        });
    });
});
