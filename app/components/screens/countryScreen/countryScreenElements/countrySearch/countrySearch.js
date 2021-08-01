import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearchCountryText } from '../../redux/searchCountryTextAction';
import IconSearchGray from '../../../../commonComponents/svg/Icon_search_gray';
import { localization } from '../../../../../common/localization';

export class CountrySearch extends React.Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillUnmount() {
        const { setSearchCountryText } = this.props;
        setSearchCountryText("");
    }

    inputChangeText = (text) => {
        const { setSearchCountryText } = this.props;
        setSearchCountryText(text.toLowerCase());
    }

    refFunc = (input) => {
        this.testInput = input
    }

    render() {
        const { language } = this.props;
        return (
            <View style={styles.searchInputContent}>
                <TouchableOpacity onPress={() => { this.testInput.focus() }} testID="BtnIconCountryID" accessibilityLabel="BtnIconCountryID">
                    <View style={styles.svgContainer}>
                        <IconSearchGray />
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={[styles.textInput, language === 'ar' ? styles.textinputWithTextAlightRight : styles.textInput]}
                    underlineColorAndroid='transparent'
                    selectionColor="#5A6772"
                    ref={this.refFunc}
                    onChangeText={this.inputChangeText}
                    placeholderTextColor='#000756'
                    placeholder={localization[language]["Enter your country"]}
                    testID="SearchInputCountryID"
                    accessibilityLabel="SearchInputCountryID"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchCountryText
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CountrySearch);
