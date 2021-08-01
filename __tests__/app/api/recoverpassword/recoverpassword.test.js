import { crmForgotPassword } from "../../../../app/api/forgotPassword/forgotPasswordSingleton";
import store from "../../../../app/redux/store/store";

describe('Test ForgotPassword', () => {
    describe('Test getRequestForgotPasswordJsonObj notvalid', () => {

        it('ForgotPassword crmForgotPasswor.getRequestForgotPasswordJsonObj(null,"test"', () => {
            expect(crmForgotPassword.getRequestForgotPasswordJsonObj(null, "test")).toEqual("null");
        });

        it('ForgotPassword crmForgotPasswor.getRequestForgotPasswordJsonObj("test",null', () => {
            expect(crmForgotPassword.getRequestForgotPasswordJsonObj("test", null)).toEqual("null");
        });
        it('ForgotPassword crmForgotPasswor.getRequestForgotPasswordJsonObj(undefined,null', () => {
            expect(crmForgotPassword.getRequestForgotPasswordJsonObj(undefined, null)).toEqual("null");
        });
    });
    describe('Test getRequestForgotPasswordJsonObj valid', () => {
        it('ForgotPassword crmForgotPasswor.getRequestForgotPasswordJsonObj("test","test")', () => {
            expect(crmForgotPassword.getRequestForgotPasswordJsonObj("test", "test")).toEqual("{\"email\":\"test\",\"culture\":\"test\"}");
        });
    });
});
