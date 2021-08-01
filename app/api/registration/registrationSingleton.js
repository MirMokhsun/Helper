/* eslint-disable prefer-destructuring */
import { Registration } from './registration';

let instance = null;
class RegistrationSingleton {
    constructor() {
        if (!instance) {
            instance = this;
            this.crmRegistration = new Registration();
        }
        return instance;
    }
}

export const crmRegistration = new RegistrationSingleton().crmRegistration;