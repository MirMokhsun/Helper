/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { View, FlatList, Text, Animated, TouchableWithoutFeedback, Easing, I18nManager, TouchableOpacity, Platform, Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListPicker } from '../../../commonComponents/listPicker/listPicker';
import { styles } from './style';
import { localization } from '../../../../common/localization';
import Help from '../../../commonComponents/svg/Help';
import Utils from '../../../../api/utils/utils';
import { withNavigation } from 'react-navigation';
import { dictionary } from '../../../../common/faq/dictionary';
import { faq } from '../../../../common/faq/faq';
import { isUndefinedReturnSecondParam } from '../../../../api/isUndefinedReturnSecondParam/isundefinedreturnsecondparam';
import { getUrl } from '../../../../api/getUrlForLinkTraidingApp/getUrlForLinkTraidingApp';

const { size, setTextAlign, isIOS } = Utils;
const maxLeftDistance = size.width / 2 - 20;
const animationDuration = 100;

export class HelpScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: isUndefinedReturnSecondParam(navigation.state.params, 'pageTitle', 'Help'),
    tabBarIcon: ({ focused }) => {
      return focused ? <Help color="#1459D2" /> : <Help color="#000756" />;
    },
  })

  constructor(props) {
    super(props);
    this.maxLeftDistance = I18nManager.isRTL ? -maxLeftDistance : maxLeftDistance;
    this.state = {
      leftDistance: new Animated.Value(0),
      isFaq: true,
      styleFaqText: styles.activeTab,
      styleVocabularyText: styles.notActiveTab,
      dictionaryFlatList: null,
    }
    this.couner = 0;
  }

  componentWillMount() {
    const { isFaq } = this.state;
    const { language, navigation, filterHelpText } = this.props;
    navigation.setParams({ pageTitle: localization[language].Help });
    this.setDictionaryFlatList(isFaq, language, filterHelpText);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFaq } = this.state;
    const { language, filterHelpText, navigation } = this.props;
    if (prevState.isFaq !== isFaq || prevProps.language !== language || prevProps.filterHelpText !== filterHelpText) {
      this.setDictionaryFlatList(isFaq, language, filterHelpText);
    }
    if (language !== prevProps.language) {
      navigation.setParams({ pageTitle: localization[language].Help });
    }
  }

  animation = (_toDistance, _fromDistane) => {
    const { leftDistance } = this.state;
    Animated.timing(
      leftDistance,
      {
        fromValue: _fromDistane,
        toValue: _toDistance,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();
  }

  toogleHelp = () => {
    const { isFaq } = this.state;
    let styleFaqText;
    let styleVocabularyText;
    if (isFaq) {
      styleFaqText = styles.notActiveTab;
      styleVocabularyText = styles.activeTab;
      this.animation(this.maxLeftDistance, 0)
    } else {
      styleFaqText = styles.activeTab;
      styleVocabularyText = styles.notActiveTab;
      this.animation(0, this.maxLeftDistance);
    }
    this.setState({
      styleFaqText,
      styleVocabularyText,
      isFaq: !isFaq
    });
  }

  createArrayListPickers = (language, arr, filterText) => {
    const { navigation } = this.props;
    const currentLanguage = localization[language];
    const filter = filterText ? filterText.toLowerCase() : '';
    const { isFaq } = this.state;
    const arrWithData = arr[language];
    const arrWithItems = [];
    const currentTextAlign = setTextAlign(language);

    arrWithData.forEach((item, i) => {
      if (arrWithData[i].title.toLowerCase().includes(filter)) {
        arrWithItems.push((<ListPicker
          id={`DetailArticleScreen_${i}`}
          text={arrWithData[i].title}
          key={i}
          currentTextAlign={currentTextAlign}
          onPress={() => {
            navigation.navigate("DetailArticleScreen", { index: i, isFaq, language, title: currentLanguage.Help } );
          }}
        />))
      }
    });
    if (filterText === '') {
      arrWithItems.unshift(
        <TouchableOpacity style={styles.containerTraidingApp} key={9999999999} onPress={this.goToTraidingApp}>
          <Text style={[styles.buttonTraidingApp, { textAlign: currentTextAlign }]}>
            {currentLanguage.OurApps}
          </Text>
        </TouchableOpacity>
      )
    }
    return arrWithItems;
  }

  goToTraidingApp = () => {
    const { language } = this.props;
    const url = getUrl(language, isIOS);
    Linking.openURL(url);
  }

  setDictionaryFlatList = (isFaq, language, filterHelpText) => {
    let result = faq;
    if (!isFaq) {
      result = dictionary
    }
    this.setState({ dictionaryFlatList: this.createArrayListPickers(language, result, filterHelpText) })
  }

  render() {
    const { styleFaqText, styleVocabularyText, leftDistance, dictionaryFlatList } = this.state;
    const { language } = this.props;
    const currentLanguage = localization[language];
    return (
      <View testID='welcome' style={styles.container}>
        <View style={styles.wrapperToogle}>
          <TouchableWithoutFeedback onPress={this.toogleHelp} testID="HelpScreenBtnID" accessibilityLabel="HelpScreenBtnID">
            <View style={styles.containerToogle} >
              <View style={styles.wrapperTextInToogle}>
                <Text style={[styles.textInToogle, styleFaqText]}>FAQ</Text>
                <Text style={[styles.textInToogle, styleVocabularyText]}>{currentLanguage.Glossary}</Text>
              </View>
              <Animated.View style={[styles.sliderInToogle, { transform: [{ translateX: leftDistance }] }]} ></Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FlatList data={dictionaryFlatList} renderItem={({ item }) => item} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.currentLanguage.language,
  filterHelpText: state.searchInHelp.filterHelpText,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HelpScreen));