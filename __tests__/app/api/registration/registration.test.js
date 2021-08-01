import { crmRegistration } from "../../../../app/api/registration/registrationSingleton";

describe('Test login', () => {
    describe('Test getRequestcrmRegistrationLeadJsonObj notvalid', () => {

        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj(undefined, "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj(undefined, "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName",undefined, "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData" )', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", undefined, "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", undefined, "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", undefined, "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", undefined, "country", "codephone", "phone", "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", undefined, "country", "codephone", "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", "agreementCheckbox", undefined, "codephone", "phone", "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", "agreementCheckbox", undefined, "codephone", "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", "agreementCheckbox", "country", undefined, "phone", "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", "agreementCheckbox", "country", undefined, "phone", "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", undefined, "language", "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", undefined, "language", "appsflayerData")).toEqual(null);
        });
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", undefined, "appsflayerData")', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", undefined, "appsflayerData")).toEqual(null);
        });
    });
    describe('Test getRequestcrmRegistrationLeadJsonObj valid', () => {
        it('isLogin crmRegistration.getRequestcrmRegistrationLeadJsonObj( "firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData" )', () => {
            expect(crmRegistration.getRequestcrmRegistrationLeadJsonObj("firstName", "lastName", "email", "agreementCheckbox", "country", "codephone", "phone", "language", "appsflayerData"))
                .toEqual("&model.firstName=firstName&model.lastName=lastName&model.phoneCountry=codephone&model.phoneOperator=codephone&model.phoneNumber=phone&model.email=email&model.country=country&model.terms=true&model.lang=language&model.linkId=oth_ios_FXHelper_organic_language");
        });
    });
});

