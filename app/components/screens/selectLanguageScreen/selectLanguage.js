import React, { Component } from 'react';
import { View, Platform, I18nManager } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListPicker } from '../../commonComponents/listPicker/listPicker';
import { styles } from './style';
import { setCurrentLanguage } from './redux/currentLanguageAction';
import { localization } from '../../../common/localization';
import { setRegistrationCountry } from '../registrationScreen/redux/registrationDataAction';
import { writeInAsyncStorage } from '../../../api/writeInAsyncStorage/writeInAsyncStorage';

export class SelectLanguageScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitle: null,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'Language preference' : 'Language preference',
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
                backgroundColor: "#F5F5F7",
            },
            headerStyle: {
                backgroundColor: "#F5F5F7",
                paddingTop: Platform.OS === 'ios' ? 20 : 10,
                borderBottomColor: "#F5F5F7",
                shadowOpacity: 0,
                elevation: 0,
            },
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props);
        const { language } = props;
        this.state = {
            selectedLanguage: language,
        }
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ title: localization[language]['LanguagePreference'] });
    }

    componentDidUpdate(prevProps, prevState) {
        const { setCurrentLanguage, navigation } = this.props;
        const { selectedLanguage } = this.state;
        if (prevState.selectedLanguage !== selectedLanguage) {
            setCurrentLanguage(selectedLanguage);
            navigation.setParams({ title: localization[selectedLanguage]['LanguagePreference'] });
        }
    }
    
    selectLanguageFunction = async (language) => {
        this.setState({ selectedLanguage: language });
        writeInAsyncStorage('@language:key', language);
    }

    render() {
        const { selectedLanguage } = this.state;
        const { language } = this.props;
        const { Languages } = localization[language];
        return (
            <View testID='welcome' style={styles.container}>
                <ListPicker id="SelectLanguageRU" text={Languages.Russian} showCirle checked={selectedLanguage === 'ru'} onPress={() => { this.selectLanguageFunction('ru') }} />
                <ListPicker id="SelectLanguageEN" text={Languages.English} showCirle checked={selectedLanguage === 'en'} onPress={() => { this.selectLanguageFunction('en') }} />
                <ListPicker id="SelectLanguageES" text={Languages.Spanish} showCirle checked={selectedLanguage === 'es'} onPress={() => { this.selectLanguageFunction('es') }} />
                {/* <ListPicker id="SelectLanguageAR" text={Languages.Arabian} showCirle checked={selectedLanguage === 'ar'} onPress={() => { this.selectLanguageFunction('ar') }} /> */}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    countryKey: state.registrationData.country.countryKey,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentLanguage,
    setRegistrationCountry,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguageScreen);