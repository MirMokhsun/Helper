import { AppRegistry, Platform } from 'react-native';
import App from './app/App';
console.disableYellowBox = true; // disable all yellow warnings
  
import { setRTLApp } from './app/api/setLanguageInStartApp/setLanguageInStartApp';
setRTLApp(Platform.OS);

if(Platform.OS==='ios'){
    AppRegistry.registerComponent('umarkets_analyticslite', () => App);
} else {
    AppRegistry.registerComponent('umarkets.analyticslite', () => App);
}