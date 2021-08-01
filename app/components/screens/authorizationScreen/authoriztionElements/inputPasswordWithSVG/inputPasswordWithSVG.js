import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import Dontshow from '../../../../commonComponents/svg/Dontshow';
import Show from '../../../../commonComponents/svg/Show';
import { WarningInputText } from '../../../../commonComponents/commonInput/commonInputElements/warningInputText';
import { validationTest } from '../../../../../api/regexFilters/validationInput';

export class InputPasswordWithSVG extends React.Component {
    constructor(props) {
        super(props);
        this._password = "";
        this.state = {
            isSecureTextEntry: true,
            isShowWarning: false,

        }
    }

    setSecureTextEntry = () => {
        const { isSecureTextEntry } = this.state;

        this.setState({
            isSecureTextEntry: !isSecureTextEntry,
        });
    }

    checkValue = (text) => {
        const { filter, action } = this.props;
        this._value = text;
        const isValidValue = validationTest(this._value, filter);
        action({ isValid: isValidValue, value: this._value.trim() });
        if (isValidValue) {
            this.setState({
                isShowWarning: false,
            });
        }
    }

    onBlur = () => {
        const { isValid } = this.props;
        if ( !isValid ) {
            this.setState({
                isShowWarning: true,
            });
        }
    }

    render() {

        const { currentLanguageName, placeholder, errorText, testID, textErrorID, keyboardType } = this.props;
        const { isShowWarning, isSecureTextEntry } = this.state;
        return (
            <View style={styles.container}>
                <View style={[styles.textinputwrapper, this._value ? null : styles.borderGray, isShowWarning ? styles.warningStyle : null,]}>
                    <TextInput
                        secureTextEntry={isSecureTextEntry}
                        keyboardType={keyboardType || 'default'}
                        testID={testID}
                        accessibilityLabel={testID}
                        value={this._value}
                        onBlur={this.onBlur}
                        selectionColor="#5A6772"
                        placeholderTextColor='#9FA0B2'
                        underlineColorAndroid='transparent'
                        onChangeText={this.checkValue}
                        style={[styles.textinput, currentLanguageName === 'ar' ? styles.textinputWithTextAlightRight : null]}
                        placeholder={placeholder} />
                    <TouchableOpacity onPress={this.setSecureTextEntry} testID="BtnShowPassAuthorizationID" accessibilityLabel="BtnShowPassAuthorizationID">
                        {isSecureTextEntry ? <Dontshow /> : <Show />}
                    </TouchableOpacity >
                </View>
                <WarningInputText isShowWarningText={isShowWarning} text={errorText} testID={textErrorID} />
            </View>
        )
    }
}

export default InputPasswordWithSVG;