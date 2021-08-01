import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';
import Checked from '../../../../commonComponents/svg/Checked';

export class AgreementAndCheckbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheck: false
        }
    }

    UNSAFE_componentWillReceiveProps({ isChecked }) {
        let result = null;
        if (isChecked) {
            result = isChecked ? <Checked /> : null;
        }
        this.setState({ showCheck: result });
    }

    routeAgreementScreen = () => {
        const { navigation, title } = this.props;
        navigation.navigate('AgreementScreen', { title });
    }

    render() {
        const { setCheckedBox, textWithClick, text } = this.props;
        const { showCheck } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={setCheckedBox} testID="BtnCheckBoxRegistrationID" accessibilityLabel="BtnCheckBoxRegistrationID">
                    <View style={styles.checkBox}>
                        {showCheck}
                    </View>
                </TouchableOpacity >
                <View style={styles.linkwrapper}>
                    <Text style={styles.text}>{text} </Text>
                    <TouchableOpacity onPress={this.routeAgreementScreen} testID="BtnAgreementRegistrationID" accessibilityLabel="BtnAgreementRegistrationID">
                        <View style={styles.linkedTextWrapper}>
                            <Text style={[styles.link, styles.text]}>{textWithClick} </Text>
                        </View>
                    </TouchableOpacity  >
                </View>
            </View>
        )
    }
}

export default withNavigation(AgreementAndCheckbox);