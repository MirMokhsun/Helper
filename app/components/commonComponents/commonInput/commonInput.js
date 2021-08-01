import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';
import WarningSVG from './svg/warning';
import { WarningInputText } from './commonInputElements/warningInputText';
import { validationTest } from '../../../api/regexFilters/validationInput';

export class CommonInput extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isShowWarning: false,
        }
    }

    checkValue = (text) => {
        const { filter, action } = this.props;
        const isValidValue = validationTest(text, filter);
        if (isValidValue) {
            this.setState({
                isShowWarning: false,
            });
        }
        action({ isValid: isValidValue, value: text.trim() });
    }

    onBlur = () => {
        const { isValid } = this.props;
        if (!isValid) {
            this.setState({
                isShowWarning: true,
            });
        }
    }

    render() {
        const { currentLanguageName, placeholder, errorText, testID, textErrorID, keyboardType, maxWidth, value } = this.props;
        const { isShowWarning } = this.state;
        return (
            <View style={[styles.container, { width: maxWidth || 290 }]}>
                <View style={[styles.textinputwrapper, value ? null : styles.borderGray, isShowWarning ? styles.warningStyle : null,]}>
                    <TextInput
                        keyboardType={keyboardType || 'default'}
                        testID={testID}
                        accessibilityLabel={testID}
                        value={value}
                        onBlur={this.onBlur}
                        selectionColor="#5A6772"
                        placeholderTextColor='#9FA0B2'
                        underlineColorAndroid='transparent'
                        onChangeText={this.checkValue}
                        style={[styles.textinput, currentLanguageName === 'ar' ? styles.textinputWithTextAlightRight : null]}
                        placeholder={placeholder}
                        autoCorrect={false} />
                    <WarningSVG isShowWarning={isShowWarning} />
                </View>
                <WarningInputText maxWidth={maxWidth} isShowWarningText={isShowWarning} text={errorText} testID={textErrorID} />
            </View>
        )
    }
}