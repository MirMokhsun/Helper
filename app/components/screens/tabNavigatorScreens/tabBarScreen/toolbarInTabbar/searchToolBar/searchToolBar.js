import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title } from '../title/title';
import IconSearchGray from '../../../../../commonComponents/svg/Icon_search_gray';
import CrossSVG from '../../../../../commonComponents/svg/crossSVG';
import { localization } from '../../../../../../common/localization';
import { styles } from '../style';
import { setSearchCatalogText } from './redux/searchCatalogAction';
import ButtonBack from '../../../../../commonComponents/buttonBack/buttonBack';
import Utils from "../../../../../../api/utils/utils";

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

export class SearchToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowSearchInput: false,
        }
    }

    showSearchInput = () => {
        this.setState({ isShowSearchInput: true }, () => this.searchInput.focus());
    }

    closeSearch = () => {
        const { setSearchCatalogText, setTextRenderCards } = this.props;
        setSearchCatalogText('');
        setTextRenderCards('');
        this.setState({ isShowSearchInput: false });
    }

    inputChangeText = (text) => {
        const { setTextRenderCards } = this.props;
        setTextRenderCards(text);
    }

    getRefOnsearch = (input) => {
        this.searchInput = input;
    }

    render() {
        const { language, title } = this.props;
        const { isShowSearchInput } = this.state;
        const currentLanguage = localization[language];
        return (
            <View style={[styles.container, constainerStyle]}>
                <View style={styles.leftEmptyView} >
                    <ButtonBack color="#000756" />
                </View>
                <View style={styles.flex1}>
                    {isShowSearchInput ?
                        (<View style={styles.searchInputContent}>
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
                        ) : <Title pageName={title} />
                    }
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
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchCatalogText,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchToolBar);