import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStack from './stackNavigator';
import SplashScreen from '../screens/splashScreen/splashScreen';

const SwitchNavigator = createAppContainer(createSwitchNavigator(
    {
        SplashScreen,
        App: AppStack,
    },
    {
        initialRouteName: 'SplashScreen',
    }
));

export default SwitchNavigator;