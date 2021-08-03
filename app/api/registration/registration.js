/* eslint-disable import/no-cycle, import/prefer-default-export, no-prototype-builtins, consistent-return,no-empty */
import stor from "../../redux/store/store";
import { crmResponseMassage } from '../../common/crmResponse';
import AppsFlyerApi from "../appsFlyerApi/appsFlyerApi";
import { writeInAsyncStorage } from '../writeInAsyncStorage/writeInAsyncStorage';
import { setUserData } from "../../components/screens/authorizationScreen/reducer/userLoginAction";
import { hideRegistrationSpiner } from "../../components/commonComponents/buttonSubmit/redux/spinersAction";
import { showPopUp } from "../../components/commonComponents/contentWrapper/redux/showPopUpAction";
import { setErrorText } from "../../components/commonComponents/contentWrapper/redux/errorTextAction";
import { config } from "../config";
import { setCurrentLanguage } from "../../components/screens/selectLanguageScreen/redux/currentLanguageAction";

export class Registration {
  constructor() {
    this.AppsFlyerApi = new AppsFlyerApi();
    // this.crmUrls = "https://publicapi.maximarkets.ai/";   // - prod maximarkets
    // this.crmUrls = "https://test-publicapi.maximarkets.ai/"; // - test maximarkets
    this.crmUrls = config.links.DOMEN;  // - prod umarkets
    // this.crmUrls = "https://test-api.umarkets.ai/";  // - test umarkets
    this.registrationLeadFirst = "Registration/lead?";
    this.registrationSecond = "Registration/second?";
  }

  getRequestcrmRegistrationLeadJsonObj = (firstName, lastName, email, agreementCheckbox, country, codephone, phone, lang, appsFlayerData) => {
    let registrationLeadJsonObj = null;
    if (firstName && lastName && email && agreementCheckbox && country && codephone && phone && lang) {
      registrationLeadJsonObj = `&model.firstName=${encodeURIComponent(firstName)
        }&model.lastName=${encodeURIComponent(lastName)
        }&model.phoneCountry=${encodeURIComponent(codephone)
        }&model.phoneOperator=${encodeURIComponent(codephone)
        }&model.phoneNumber=${encodeURIComponent(phone)
        }&model.email=${encodeURIComponent(email)
        }&model.country=${country
        }&model.terms=true&model.lang=${lang
        }${this.AppsFlyerApi.makeAppsFlyerInfo(appsFlayerData, lang)}`;
    }
    return registrationLeadJsonObj;
  }

  getRequestcrmRegistrationSecondJsonObj = (password) => {
    let registrationSecondJsonObj = null;
    if (password) {
      registrationSecondJsonObj = `model.password=${encodeURIComponent(password)}&model.terms=true`;
    }
    return registrationSecondJsonObj;
  }

  registrationLead = async (firstName, lastName, email, agreementCheckbox, country, codephone, phone, lang, appsFlayerData) => {
    // make 1st registrationLeadJsonObj
    const registrationLeadJsonObj = this.getRequestcrmRegistrationLeadJsonObj(firstName, lastName, email, agreementCheckbox, country, codephone, phone, lang, appsFlayerData);
    // send 1st registrationLeadJsonObj
    const responseRegistrationLead = await this.__callFeach(
      config.links.DOMEN + this.registrationLeadFirst + registrationLeadJsonObj,
      "GET"
    );
    // check if 1st registrationLeadJsonObj was succsesfull
    const registrationGuid = this.checkregistrationLeadFirstResponse(responseRegistrationLead);
    if (registrationGuid) {
      const password = this.generetePassword();
      const registrationSecondJsonObj = this.getRequestcrmRegistrationSecondJsonObj(password);
      const responseRegistrationSecond = await this.__callFeach(
        config.links.DOMEN + this.registrationSecond + registrationSecondJsonObj,
        "GET"
      );
      this.checkregistrationLeadResponse(responseRegistrationSecond, registrationGuid, email,lang);
    };
  }

  generetePassword = () => Math.random().toString(36).substr(2, 8)

  checkregistrationLeadFirstResponse = (responseRegistrationLead) => {
    let registrationGuid = null;
    if (responseRegistrationLead.hasOwnProperty("errorType")) {
      const crmResponse = crmResponseMassage(responseRegistrationLead.statusCode, responseRegistrationLead.errorType, stor);
      stor.dispatch(setErrorText(crmResponse));
      const popUpName = 'registrationError';
      stor.dispatch(showPopUp(popUpName));
    } else {
      // eslint-disable-next-line prefer-destructuring
      registrationGuid = responseRegistrationLead.registrationGuid;
    }
    return registrationGuid;
  }

  checkregistrationLeadResponse = async (response, registrationGuid, email,language) => {
    try {
      stor.dispatch(hideRegistrationSpiner());
      if (response && response.hasOwnProperty("errorType")) {
        if ((response.errorType === 6) && registrationGuid) {
          this.AppsFlyerApi.registartionEvent(registrationGuid, "Attempt");
        }
        const crmResponse = crmResponseMassage(response.statusCode, response.errorType, stor);
        stor.dispatch(setErrorText(crmResponse));
        const popUpName = 'registrationError';
        stor.dispatch(showPopUp(popUpName));
      } else {
        this.AppsFlyerApi.registartionEvent(registrationGuid, "Attempt");
        this.AppsFlyerApi.registartionEvent(registrationGuid, "Lead");
        await  writeInAsyncStorage('@userData:key', email);
        stor.dispatch(setUserData(email));
        stor.dispatch(setCurrentLanguage(language));
        const popUpName = 'registrationPopUp';
        stor.dispatch(showPopUp(popUpName));
      }
    } catch (error) {

    }
  }

  __callFeach = async (url, method) => {
    try {
      const response = await fetch(url, {
        credentials: "include",
        method,
        headers: {
          "Access-Control-Expose-Headers": "User-Context",
          'Accept': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
    }
  }

  contactWithBroker = async (email) => {
    try {
      const registrationLeadJsonObj = this.getRequestcrmRegistrationLeadJsonObjForContactWithBroker(email);
      const responseRegistrationLead = await this.__callFeach(
        this.crmUrls + this.registrationLeadFirst + registrationLeadJsonObj,
        "GET"
      );
      const registrationGuid = this.checkregistrationLeadFirstResponse(responseRegistrationLead);
      stor.dispatch(hideRegistrationSpiner());
      if (registrationGuid) {
        const popUpName = 'connectMeneger';
        stor.dispatch(showPopUp(popUpName));
      };
    } catch (error) {
    }
  }

  getRequestcrmRegistrationLeadJsonObjForContactWithBroker = (email) => {
    let registrationLeadJsonObj = null;

    if (email) {
      registrationLeadJsonObj = `${"&model.firstName=call&model.lastName=broker&model.phoneNumber=1234567" +
        "&model.phoneCountry=380&model.phoneOperator=063&model.email="}${encodeURIComponent(email)}&model.terms=true`;
    }
    return registrationLeadJsonObj;
  }
}