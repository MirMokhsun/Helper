import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { CommonInput } from '../../../../commonComponents/commonInput/commonInput';

export class PhoneInput extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { currentLanguageName, phcode, placeholder, errorText, filter, action, isValid, maxWidth, value } = this.props;
        return (
            <View style={styles.conteiner}>
                <View style={styles.phoneCodeWrapper}>
                    <Text style={styles.text}>+{phcode}</Text>
                </View>
                <CommonInput
                    value = { value }
                    keyboardType='numeric'
                    maxWidth={maxWidth}
                    placeholder={placeholder}
                    errorText={errorText}
                    filter={filter}
                    action={action}
                    isValid={isValid}
                    testID="InputPhoneRegistrationID"
                    textErrorID="PhoneErrorRegostrationID"
                    currentLanguageName={currentLanguageName}
                />
            </View>
        )
    }
}

export default PhoneInput;