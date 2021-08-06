import { AppRegistry, Platform } from 'react-native';
import App from './app/App';
console.disableYellowBox = true; // disable all yellow warnings
  
import { setRTLApp } from './app/api/setLanguageInStartApp/setLanguageInStartApp';
setRTLApp(Platform.OS);

if(Platform.OS==='ios'){
    AppRegistry.registerComponent('rn_analytics_light', () => App);
} else {
    AppRegistry.registerComponent('rn_analytics_light', () => App);
}