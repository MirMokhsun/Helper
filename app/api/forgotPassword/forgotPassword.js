/* eslint-disable no-return-await, no-prototype-builtins */
import stor from "../../redux/store/store";
import { crmResponseMassage } from '../../common/crmResponse';
import { setErrorText } from "../../components/commonComponents/contentWrapper/redux/errorTextAction";
import { showPopUp } from "../../components/commonComponents/contentWrapper/redux/showPopUpAction";
import { hideForgotPasswordSpiner } from "../../components/commonComponents/buttonSubmit/redux/spinersAction";
import { config } from "../config";

export class ForgotPassword {
  constructor() {
    // this.crmUrls = "https://publicapi.maximarkets.ai/";   // - prod maximarkets
    // this.crmUrls = "https://test-publicapi.maximarkets.ai/"; // - test maximarkets
    this.crmUrls = config.links.DOMEN;  // - prod umarkets
    // this.crmUrls = "https://test-api.umarkets.ai/";  // - test umarkets
    // this.fogotpassword = "Account/forgot-password";
    this.fogotpassword = "account/forgot-password";
    this.cultureIso = "dictionary/countryiso";
  }

  getRequestForgotPasswordJsonObj = (email, language) => {
    let authData = null;
    if (email && language) {
      authData = {
        'email': email,
        'culture': language,
      };
    }
    return JSON.stringify(authData);
  }

  forgotpassword = async (email, language) => {
    try {
      const authorizeData = this.getRequestForgotPasswordJsonObj(email, language);
      const response = await this.__callFeach(
        config.links.DOMEN + this.fogotpassword,
        "POST",
        authorizeData
      );
      this.checkForgotPasswordResponse(response);
    } catch (error) {
      console.warn(error);
    }
  }

  checkForgotPasswordResponse = (response) => {
    // прячет спинер
    stor.dispatch(hideForgotPasswordSpiner());
    // в зависимости от ошибки выводит попапы 
    if (response.hasOwnProperty("errorType")) {
      // получает ответ от срм
      const crmResponse = crmResponseMassage(response.statusCode, response.errorType, stor);
      // записывает ошибку в редакс
      stor.dispatch(setErrorText(crmResponse));
      // имя попапа, который будет показан
      const popUpName = 'forgotPasswordError';
      // выводит попап, в котором записана ошибка
      stor.dispatch(showPopUp(popUpName));
    } else {
      // имя попапа, который будет показан
      const popUpName = 'forgotPasswordSuccessful';
      // выводит попап с позитывным сообщением
      stor.dispatch(showPopUp(popUpName));
    }
  }

  GetCountryIso = async (url) => {
    return await this.__callFeach(url, "GET", "");
  }

  __callFeach = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}