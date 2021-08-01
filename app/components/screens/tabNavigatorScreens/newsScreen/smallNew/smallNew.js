import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import SmallClockGray from './svg/smallClockGray';
import { withNavigation } from 'react-navigation';
import { setNewsDetails } from "./redux/setNewsDetailsAction";
import store from '../../../../../redux/store/store';
import { styles } from './styles';
import { localization } from '../../../../../common/localization';

export class SmallNew extends PureComponent {
    constructor(props) {
        super(props);
    }

    goToNewsDetails = () => {
        const { navigation, id, setNewsDetails, scrollView, randomNumb, language } = this.props;
        scrollView.scrollTo({ x: 0, y: 0, animated: false });
        navigation.navigate('NewsDetailsScreen', { randomNumb, title:  localization[language].News });
        store.dispatch(setNewsDetails(id));
    }

    render() {
        const { image, textNews, timeNews, id, currentTextAlign } = this.props;
        return (
            <TouchableOpacity onPress={this.goToNewsDetails} testID={`SmallNew_${id}ID`} accessibilityLabel={`SmallNew_${id}ID`}>
                <View style={styles.maincontainer} alignSelf="center">
                    <View style={styles.imageContainner}>
                        {image}
                    </View>
                    <Text style={[styles.textNewsStyle, { textAlign: currentTextAlign || 'left' }]}>{textNews}</Text>
                    <View style={styles.timeNewsWrapper}>
                        <SmallClockGray />
                        <Text style={styles.timeNewsStyle}>{timeNews}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}
const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    navigation: state.stackNavigator.navigator
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setNewsDetails
}, dispatch);
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SmallNew));