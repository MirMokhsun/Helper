import { crmlogin } from "../../../../app/api/autorization/autorizationSingletone";
import store from "../../../../app/redux/store/store";
import { setUserData } from "../../../../app/components/screens/authorizationScreen/reducer/userLoginAction";

describe('Test login', () => {
    describe('Test getRequestLoginJsonObj notvalid', () => {

        it('isLogin crmlogin.getRequestLoginJsonObj(null,"test"', () => {
            expect(crmlogin.getRequestLoginJsonObj(null, "test")).toEqual("null");
        });

        it('isLogin crmlogin.getRequestLoginJsonObj("test",null', () => {
            expect(crmlogin.getRequestLoginJsonObj("test", null)).toEqual("null");
        });
        it('isLogin crmlogin.getRequestLoginJsonObj(undefined,null', () => {
            expect(crmlogin.getRequestLoginJsonObj(undefined, null)).toEqual("null");
        });
    });
    describe('Test getRequestLoginJsonObj valid', () => {
        it('isLogin crmlogin.getRequestLoginJsonObj("test","test")', () => {
            expect(crmlogin.getRequestLoginJsonObj("test", "test")).toEqual("{\"email\":\"test\",\"password\":\"test\"}");
        });
    });
    describe('Test dispathSetLogin notvalid', () => {
        it('isLogin stor.dispatch(setUserData(null))', () => {
            store.dispatch(setUserData(null));
            let userEmail = store.getState().userLoginData.userEmail;
            expect(userEmail).toEqual(null);
        });
    });
    describe('Test dispathSetLogin valid', () => {
        it('isLogin stor.dispatch(setUserData("userEmail"))', () => {
            store.dispatch(setUserData('userEmail'));
            let userEmail = store.getState().userLoginData.userEmail;
            expect(userEmail).toEqual('userEmail');
        });
    });

});
