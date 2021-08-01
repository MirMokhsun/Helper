import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Easing, Animated, I18nManager, Platform } from 'react-native';
import RegistrationScreen from '../screens/registrationScreen/registrationScreen';
import AuthorizationScreen from '../screens/authorizationScreen/authorizationScreen';
import ForgotPasswordScreen from '../screens/forgotPasswordScreen/forgotPasswordScreen';
import AgreementScreen from '../screens/agreementScreen/agreementScreen';
import SelectLanguageScreen from '../screens/selectLanguageScreen/selectLanguage';
import CountryScreen from '../screens/countryScreen/countryScreen';
import CatalogDetailsScreen from '../screens/catalogDetailsScreen/catalogDetailsScreen';
import NewsDetailsScreen from '../screens/newsDetailsScreen/newsDetailsScreen';
import OurAppsScreen from '../screens/ourApps/ourApps';
import NotificationsItemDetailsScreen from '../screens/notificationItemDetailsScreen/notificationItemDetailsScreen';
import NotificationsScreen from '../screens/notificationsScreen/notificationsScreen';
import DetailCardScreen from '../screens/detailCardScreen/detailCardScreen';
import DetailArticleScreen from '../screens/detailArticleScreen/detailArticleScreen';
import StackNavigatorForTabBar from './stackNavigatorForTabBar';

const navigationOptions = {
    headerTintColor: '#000756',
    headerBackTitle: null,
    headerTitleStyle: {
        color: "#000756",
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        textAlign: "center",
        fontSize: 20,
        lineHeight: 40,
        ...Platform.select({
            ios: {
                paddingRight: 0,
            },
            android: {
                paddingRight: I18nManager.isRTL ? 0 : 30,
                paddingLeft: I18nManager.isRTL ? 30 : 0,
            },
        }),
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
        backgroundColor: "#F5F5F7",
    },
    headerStyle: {
        backgroundColor: "#F5F5F7",
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
        borderBottomColor: "transparent",
        shadowOpacity: 0,
        elevation: 0,
    },
};

export const AppStack = createStackNavigator({
    TabAppNavigator: {
        screen: StackNavigatorForTabBar,
        navigationOptions: { ...navigationOptions }
    },
    CatalogDetailsScreen: {
        screen: CatalogDetailsScreen,
        navigationOptions: { ...navigationOptions }
    },
    DetailCardScreen: {
        screen: DetailCardScreen,
        navigationOptions: { ...navigationOptions }
    },
    NewsDetailsScreen: {
        screen: NewsDetailsScreen,
        navigationOptions: { ...navigationOptions }
    },
    RegistrationScreen: {
        screen: RegistrationScreen,
        navigationOptions: { ...navigationOptions }
    },
    CountryScreen: {
        screen: CountryScreen,
    },
    SelectLanguageScreen: {
        screen: SelectLanguageScreen,
        navigationOptions: { ...navigationOptions }
    },
    AuthorizationScreen: {
        screen: AuthorizationScreen,
        navigationOptions: { ...navigationOptions }
    },
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen,
        navigationOptions: { ...navigationOptions }
    },
    AgreementScreen: {
        screen: AgreementScreen,
        navigationOptions: { ...navigationOptions }
    },
    OurAppsScreen: {
        screen: OurAppsScreen,
        navigationOptions: { ...navigationOptions }
    },
    NotificationsScreen: {
        screen: NotificationsScreen,
        navigationOptions: { ...navigationOptions }
    },
    NotificationsItemDetailsScreen: {
        screen: NotificationsItemDetailsScreen,
        navigationOptions: { ...navigationOptions }
    },
    DetailArticleScreen: {
        screen: DetailArticleScreen,
        navigationOptions: { ...navigationOptions }
    },
}, {
        backgroundColor: '#ffffff',
        headerMode: 'screen',
        mode: 'card',
        transitionConfig: () => ({
            transitionSpec: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: sceneProps => {
                const {
                    layout,
                    position,
                    scene
                } = sceneProps;
                const thisSceneIndex = scene.index;
                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex],
                    outputRange: [width, 0],
                })

                return {
                    transform: [{
                        translateX
                    }]
                }
            },
        }),
    })
export default createAppContainer(AppStack);