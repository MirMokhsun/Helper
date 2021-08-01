import { localization } from "./localization";

export const crmResponseMassage = (statusCode, errorFromServer, stor) => {
  const local = stor.getState().currentLanguage.language;
  const currentLang = localization[local];
  let statusResponse = '';
  if (statusCode === 401) {
    // Email or Password Incorrect
    statusResponse = currentLang.EmailOrPassWrong;
  }
  else if (statusCode === 500 && errorFromServer === 3) {
    // Invalid parametrs
    statusResponse = currentLang.InvalidParameters;
  }
  else if (statusCode === 500 && errorFromServer === 6) {
    // Email already exist
    statusResponse = currentLang.EmailIsExist;
  }
  else if (statusCode === 500 && errorFromServer === 10) {
    // Email not exist
    statusResponse = currentLang.EmailWrong;
  }
  else {
    // All another errors from server
    statusResponse = currentLang.AnotherProblem;
  }

  return statusResponse;
}