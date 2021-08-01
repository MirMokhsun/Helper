/* eslint-disable default-case */
export const getUrl = (language, isIOS) => {
  let url = 'https://go.onelink.me/app/';
  if (isIOS) {
    switch (language) {
      case "es":
        url += '300c1339';
        break;
      case "ru":
        url += '49612676';
        break;
      case "en":
        url += '183a0576';
        break;
      case "ar":
        url += '908402bd';
        break;
    }
  } else {
    switch (language) {
      case "es":
        url += 'd2f31cfb';
        break;
      case "ru":
        url += '30df371e';
        break;
      case "en":
        url += '6ca3f09a';
        break;
      case "ar":
        url += '493c471';
        break;
    }
  }
  return url;
}