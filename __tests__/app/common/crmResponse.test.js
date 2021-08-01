
import { crmResponseMassage } from "../../../app/common/crmResponse";
import store from "../../../app/redux/store/store";

describe('Test crmResponseMassage', () => {
    it('crmResponseMassage', () => {
        expect(crmResponseMassage(401, null, store)).toEqual("Incorrect email address or password.");
    });
    it('crmResponseMassage', () => {
        expect(crmResponseMassage(500, 3, store)).toEqual("Registration is currently unavailable. Try again later");
    });
    it('crmResponseMassage', () => {
        expect(crmResponseMassage(500, 6, store)).toEqual("A user with this email already exists. Please find a letter with a password in your mailbox or register using a new email address.");
    });
    it('crmResponseMassage', () => {
        expect(crmResponseMassage(500, 10, store)).toEqual("Incorrect email address.");
    });
    it('crmResponseMassage', () => {
        expect(crmResponseMassage(null, null, store)).toEqual("An unexpected error has occured.");
    });
});