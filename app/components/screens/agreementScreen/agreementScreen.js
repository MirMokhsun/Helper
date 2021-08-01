import React from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { agreementDoc } from './textAgreement';
import { styles } from './styles';
import { localization } from '../../../common/localization';
import ButtonSubmit from '../../commonComponents/buttonSubmit/buttonSubmit';
import { setRegistrationCheckbox } from '../registrationScreen/redux/registrationDataAction';

export class AgreementScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'User agreement' : 'User agreement',
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            allAgreementText: null
        }
    }

    getText = () => {
        let agreemet = null;
        const { language } = this.props;
        const objectsAgreemet = this.returnAgreementDocWithLocalization(language);
        if (objectsAgreemet) {
            agreemet = [];
            for (const key in objectsAgreemet) {
                let textStyle = null;
                if (objectsAgreemet[key].textstyle === 'regularText') {
                    textStyle = styles.regularText;
                } else {
                    textStyle = styles.titleText;
                }
                agreemet.push(
                    <Text
                        key={key}
                        style={textStyle}
                    >{objectsAgreemet[key].text}</Text>
                );
            }
            agreemet.push(
                <View style={styles.buttonWrapper}>
                    <ButtonSubmit
                        text={localization[language].introduced}
                        testID="ButtonAgreementID"
                        isDisabled={false}
                        isShowSpiner={false}
                        onPress={this.backToRegistration}
                    />
                </View>
            );
        }
        return agreemet;
    }

    backToRegistration = () => {
        const { agreementCheckbox, setRegistrationCheckbox, navigation } = this.props;
        if (!agreementCheckbox) {
            setRegistrationCheckbox();
        }
        navigation.goBack();
    }

    returnAgreementDocWithLocalization = (languageName) => {
        let agreement = agreementDoc.en;
        switch (languageName) {
            case 'ru':
                agreement = agreementDoc.ru;
                break;
            case 'es':
                agreement = agreementDoc.es;
                break;
            case 'ar':
                agreement = agreementDoc.ar;
                break;
            default:
                break;
        }
        return agreement
    }

    componentDidMount() {
        const allAgreementText = this.getText();
        this.setState({
            allAgreementText
        });
        const { navigation } = this.props;
        const { title } = navigation.state.params;
        navigation.setParams({ title });
    }

    render() {
        const { allAgreementText } = this.state;
        return (
            <View style={styles.wrapper}>
                <StatusBar barStyle="light-content" backgroundColor="#000756" />
                <FlatList
                    data={allAgreementText}
                    renderItem={({ item }) => item}
                    keyboardShouldPersistTaps="handled"
                    style={styles.scroll}
                    contentContainerStyle={{ backgroundColor: '#F5F5F7' }} />
            </View>
        )
    }
}


const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    agreementCheckbox: state.registrationData.agreementCheckbox.isValid
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setRegistrationCheckbox,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgreementScreen);