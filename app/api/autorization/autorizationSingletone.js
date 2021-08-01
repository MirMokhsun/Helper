/* eslint-disable prefer-destructuring */
import { AutorizationApi } from './autorizationApi';

let instance = null;
class AutorizationSingleton {
    constructor() {
        if (!instance) {
            instance = this;
            this.crmlogin = new AutorizationApi();
        }
        return instance;
    }
}

export const crmlogin = new AutorizationSingleton().crmlogin;