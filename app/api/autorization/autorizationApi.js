/* eslint-disable no-prototype-builtins */
import { hideAuthorizationSpiner } from "../../components/commonComponents/buttonSubmit/redux/spinersAction";
import stor from "../../redux/store/store";
import { crmResponseMassage } from '../../common/crmResponse';
import { writeInAsyncStorage } from '../writeInAsyncStorage/writeInAsyncStorage';
import { setErrorText } from "../../components/commonComponents/contentWrapper/redux/errorTextAction";
import { showPopUp } from "../../components/commonComponents/contentWrapper/redux/showPopUpAction";
import { setUserData } from "../../components/screens/authorizationScreen/reducer/userLoginAction";
import { config } from "../config";

export class AutorizationApi {
  constructor() {
    // this.crmUrls = "https://publicapi.maximarkets.ai/";   // - prod maximarkets
    // this.crmUrls = "https://test-publicapi.maximarkets.ai/"; // - test maximarkets

    this.crmUrls = config.links.DOMEN;  // - prod umarkets
    // this.crmUrls =  "https://test-api.umarkets.ai/";  // - test umarkets
    this.authorize = "account/logon";
    this.fogotpassword = "account/forgot-password";
  }

  getRequestLoginJsonObj = (email, password) => {
    let authData = null;
    if (email && password) {
      authData = {
        'email': email,
        'password': password
      };
    }
    return JSON.stringify(authData);
  }

  login = async (email, password, navigation) => {
    const authorizeData = this.getRequestLoginJsonObj(email, password);
    const response = await this.__callFeach(config.links.DOMEN + this.authorize, "POST", authorizeData);
    this.checkLoginResponse(response, navigation);
  }

  checkLoginResponse = (response, navigation) => {
    try {
      const { statusCode, errorType, email, id } = response;
      stor.dispatch(hideAuthorizationSpiner());                                                    // прячет спинер
      if (response.hasOwnProperty("errorType")) {
        const crmResponse = crmResponseMassage(statusCode, errorType, stor);
        stor.dispatch(setErrorText(crmResponse));                                                  // записывает текст который будет отображаться в еррор попапе
        const popUpName = 'authorizationError';
        stor.dispatch(showPopUp(popUpName));
      } else {
        navigation.navigate("TabAppNavigator");                                                    // переходит в таб навигатор
        this.dispathSetUserMail(email);
        writeInAsyncStorage('@CRMid:key', id.toString());                                          // записать эмейл в редакс
        writeInAsyncStorage('@userData:key', email);                                               // записать в асинк сторедж mail
      }
    } catch (error) {

    }
  }

  dispathSetUserMail = (mail) => {
    if (mail) {
      stor.dispatch(setUserData(mail));
    }
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