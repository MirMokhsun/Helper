/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, I18nManager } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles } from './style';
import { dictionary } from '../../../common/faq/dictionary';
import { faq } from '../../../common/faq/faq';
import { localization } from '../../../common/localization';
import Utils from '../../../api/utils/utils';

const isIos = Utils.isIOS;
const {isRTL} = I18nManager;
const {setTextAlign} = Utils

export class DetailArticleScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitle: null,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'Help' : 'Help',
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
                        paddingRight: isRTL ? 0 : 30,
                        paddingLeft: isRTL ? 30 : 0,
                    },
                }),
                fontFamily: 'Roboto-Regular',
                backgroundColor: "#F5F5F7",
            },
            headerStyle: {
                backgroundColor: "#F5F5F7",
                paddingTop: isIos ? 20 : 10,
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
            currentTextAlign: setTextAlign(language)
        }
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ title: localization[language]['Help'] });
    }


    componentDidUpdate({ language: prevLanguage }) {
        const { language } = this.props;
        if (language !== prevLanguage) {
            this.setState({ currentTextAlign: setTextAlign(language) });
        }
    }

    render() {
        const {
            index,
            isFaq, // нужен для того что бы выбирать между словариком и faq
            language
        } = this.props.navigation.state.params;
            const currentlanguage = isFaq ? faq[language][index] : dictionary[language][index];
            const { currentTextAlign } = this.state;
        return (
            <View testID='welcome' style={styles.container}>
                <ScrollView>
                    <Text style={[styles.title, { textAlign: currentTextAlign }]} >{currentlanguage['title']}</Text>
                    <Text style={[styles.text, { textAlign: currentTextAlign }]}>{currentlanguage['text']}</Text>
                </ScrollView >
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticleScreen);
