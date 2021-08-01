import { combineReducers } from 'redux';
import connectionStatus from '../../components/recconect/redux/connectionStatus';
import webSocketClient from '../../common/webSocketClient/redux/webSocketReducer';
import registrationData from '../../components/screens/registrationScreen/redux/registrationDataReducer';
import authorizationData from '../../components/screens/authorizationScreen/reducer/authorizationDataReducer';
import forgotPasswordData from '../../components/screens/forgotPasswordScreen/redux/forgotPasswordDataReduser';
import spiners from '../../components/commonComponents/buttonSubmit/redux/spinersReducer';
import currentLanguage from '../../components/screens/selectLanguageScreen/redux/currentLanguageReducer';
import searchCountryText from '../../components/screens/countryScreen/redux/searchCountryTextReducer';
import userLoginData from '../../components/screens/authorizationScreen/reducer/userLoginReducer';
import appsFlyerData from '../../api/appsFlyerApi/redux/appsFlyerReduser';
import popUpVisibility from '../../components/commonComponents/contentWrapper/redux/showPopUpReducer';
import setNews from '../../components/screens/tabNavigatorScreens/newsScreen/redux/setNewsReduser'
import newsChanel from '../../components/screens/tabNavigatorScreens/newsScreen/newsChanelPicker/redux/newsChanelReduser';
import setNewsDetails from '../../components/screens/tabNavigatorScreens/newsScreen/smallNew/redux/setNewsDetailsRedux';
import errorText from '../../components/commonComponents/contentWrapper/redux/errorTextReducer';
import notificationsItemDetails from '../../components/screens/notificationItemDetailsScreen/redux/NotificationsItemDetails';
import cardItem from '../../components/screens/detailCardScreen/redux/cardItemReducer';
import functionAddQuotationMap from '../../components/screens/tabNavigatorScreens/catalogScreen/redux/functionAddQuotationMapRedux';
import currentCatalogScreen from '../../components/screens/catalogDetailsScreen/redux/currentScreenRedecer';
import searchInHelp from '../../components/screens/tabNavigatorScreens/helpScreen/redux/searchInHelpReducer';
import searchCatalog from '../../components/screens/tabNavigatorScreens/tabBarScreen/toolbarInTabbar/searchToolBar/redux/searchCatalogReducer';
import endCandleFrame from '../../components/screens/detailCardScreen/detailCardScreenElements/chart/redux/addInEndCandleFrameRedux';
import candlesFunc from '../../components/screens/detailCardScreen/detailCardScreenElements/chart/redux/candleArrReducer';
import zoomCharts from '../../components/screens/detailCardScreen/detailCardScreenElements/chart/redux/zoomChartsReducer';
import setNotificationObj from '../../api/notification.api/redux/notificationObj';
import historyNotification from '../../api/notification.api/redux/historyNotification';
import notificationDataOpen from '../../api/notification.api/redux/notificationOpen';
import stackNavigator from '../../components/screens/splashScreen/redux/stackNavigatorReducer';

const rootReducer = combineReducers({
    currentCatalogScreen,
    functionAddQuotationMap,
    cardItem,
    errorText,
    userLoginData,
    stackNavigator,
    searchCountryText,
    spiners,
    forgotPasswordData,
    registrationData,
    authorizationData,
    connectionStatus,
    webSocketClient,
    currentLanguage,
    appsFlyerData,
    popUpVisibility,
    setNews,
    newsChanel,
    setNewsDetails,
    notificationsItemDetails,
    searchInHelp,
    searchCatalog,
    endCandleFrame,
    candlesFunc,
    zoomCharts,
    setNotificationObj,
    historyNotification,
    notificationDataOpen
})

export default rootReducer;