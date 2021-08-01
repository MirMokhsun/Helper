import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title } from './title/title';
import IconSearchGray from '../../../../commonComponents/svg/Icon_search_gray';
import CrossSVG from '../../../../commonComponents/svg/crossSVG';
import { localization } from '../../../../../common/localization';
import { styles } from './style';
import { setSearchInHelpText } from '../../helpScreen/redux/searchInHelpAction';
import Utils from "../../../../../api/utils/utils";

const { isIphoneX } = Utils;

const constainerStyle = Platform.select({
  ios: {
    minHeight: isIphoneX ? 96 : 76,
    maxHeight: isIphoneX ? 96 : 76,
    paddingTop: isIphoneX ? 40 : 20,
  },
  android: {
    minHeight: 56,
    maxHeight: 56,
  },
});

export class ToolbarInTabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchInput: false,
      pageTitle: '',
      routeName: ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { navigation: { state: { index, routes } } } = nextProps;
    const { params: { pageTitle }, routeName } = routes[index]
    this.setState({ pageTitle, routeName });
  }

  showSearchInput = () => {
    this.setState({ isShowSearchInput: true }, () => this.searchInput.focus());
  }

  closeSearch = () => {
    const { setSearchInHelpText } = this.props;
    this.setState({ isShowSearchInput: false });
    setSearchInHelpText('');
  }

  inputChangeText = (text) => {
    const { setSearchInHelpText } = this.props;
    setSearchInHelpText(text);
  }

  getRefOnsearch = (input) => {
    this.searchInput = input;
  }

  render() {
    const { language } = this.props;
    const currentLanguage = localization[language];
    const { isShowSearchInput, pageTitle, routeName } = this.state;
    return (
      <View style={[styles.container, constainerStyle]}>
        <View style={styles.leftEmptyView} />
        {routeName === 'Help' ?
          (
            <View style={styles.flex1}>
              {isShowSearchInput ?
                (
                  <View style={styles.searchInputContent}>
                    <TextInput
                      ref={this.getRefOnsearch}
                      style={[styles.textInput, language === 'ar' ? styles.textinputWithTextAlightRight : null]}
                      underlineColorAndroid='transparent'
                      selectionColor="#5A6772"
                      onChangeText={this.inputChangeText}
                      placeholderTextColor='#000756'
                      placeholder={currentLanguage["helpSearch"]}
                      testID="SearchInputCountryID"
                      accessibilityLabel="SearchInputCountryID"
                    />
                  </View>
                ) : <Title pageName={pageTitle} />}
              <View style={styles.rightComponent} >
                {isShowSearchInput ? (
                  <TouchableOpacity onPress={this.closeSearch} testID="ToolbarInTabbarCloseID" accessibilityLabel="ToolbarInTabbarCloseID">
                    <CrossSVG color='#000756' />
                  </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={this.showSearchInput} testID="ToolbarInTabbarSearchID" accessibilityLabel="ToolbarInTabbarSearchID">
                      <IconSearchGray color='#000756' />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
          ) : (
            <View style={styles.flex1}>
              <Title pageName={pageTitle} />
              <View style={styles.rightComponent} />
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.currentLanguage.language,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  setSearchInHelpText,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ToolbarInTabbar);