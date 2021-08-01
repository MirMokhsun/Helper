/* eslint-disable prefer-destructuring */
import { ForgotPassword } from './forgotPassword';

let instance = null;
class ForgotPasswordSingleton {
    constructor() {
        if (!instance) {
            instance = this;
            this.crmForgotPassword = new ForgotPassword();
        }
        return instance;
    }
}

export const crmForgotPassword = new ForgotPasswordSingleton().crmForgotPassword;