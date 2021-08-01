import React, { Component } from 'react';
import { View, Platform, I18nManager } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OurAppPicker } from './ourAppPicker/ourAppPicker';
import { localization } from '../../../common/localization';
import Utils from '../../../api/utils/utils';

export class OurAppsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitle: null,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'OurApps' : 'OurApps',
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
        this.isIos = Utils.isIOS;
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ title: localization[language]['OurApps'] });
    }

    render() {
        return (
            <View testID='welcome' style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
                {this.isIos ? null : (
                    <OurAppPicker
                        text="FX Indicators"
                        image={require('../../../common/images/fxind.jpg')}
                        appStorelink=""
                        playStoreId="com.umarkets.indicators"
                    />
                )}

                <OurAppPicker
                    text="FX Quotes"
                    image={require('../../../common/images/fxquo.jpg')}
                    appStorelink="https://itunes.apple.com/us/app/fx-quotes/id1434838460"
                    playStoreId="com.umarkets.quotes"
                />
                <OurAppPicker
                    text="Analytics Forex"
                    image={require('../../../common/images/analfor.jpg')}
                    appStorelink="https://itunes.apple.com/us/app/analytics-forex/id1206275896"
                    playStoreId="com.umarkets.analyticsforex"
                />
                <OurAppPicker
                    text="Umarkets Trading App"
                    image={require('../../../common/images/uma.jpg')}
                    appStorelink="https://itunes.apple.com/us/app/umarkets/id1375545813"
                    playStoreId="com.umarkets.trading"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OurAppsScreen);