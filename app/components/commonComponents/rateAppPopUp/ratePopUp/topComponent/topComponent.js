/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Linking } from 'react-native';
import { styles } from './styles';
import { BtnStar } from './btnStar/btnStar';
import qs from 'qs';
import AppLink from 'react-native-app-link';

export class TopComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfStars: 0,
            commentText: '',
            isShowTextarea: false,
            isShowError: false,
        }
    }

    setNumberOfStars = (number) => {
        if (number) {
            this.setState({ numberOfStars: number });
        }
    }

    submitRate = () => {
        const { numberOfStars, isShowTextarea, commentText, isShowError } = this.state;
        const { closeFunc } = this.props;
        let newState = null;

        if (numberOfStars >= 1 && numberOfStars <= 3) { // от одной до трех звезд
            if (!isShowTextarea) {
                newState = { isShowTextarea: true }; // показываем инпут если звезд выбрано до трех включительно
            } else if (commentText.length >= 10) { // если длинна коментария до 10 символов включительно
                if (isShowError) {
                    newState = { isShowError: false }; // скрываем ошибку если она есть
                }
                this.sendEmail("help@umarkets.net", "rate analytics light", commentText); // отправить данные на эмейл
                closeFunc();
            } else {
                // вызываем ошибку валидации
                newState = { isShowError: true }; // показываем ошибку если количество символов в инпуте <= 10
            }
        } else if (numberOfStars >= 4 && numberOfStars <= 5) { // от 4-5 звезд
            const appStorelink = "https://itunes.apple.com/us/app/fx-helper/id1449568979";
            const playStoreId = "com.umarkets.analyticslite";

            this.goToStore(playStoreId, appStorelink);// отправляем юзера на плеймаркет\аппстор
            closeFunc();
        }

        if (newState) {
            this.setState(newState);
        }
    }

    goToStore = (playStoreId, appStorelink) => {
        if (Platform.OS === 'ios') {
            Linking.openURL(appStorelink);
        } else {
            AppLink.openInStore({ playStoreId });
        }
    }

    setCommentText = (text) => {
        this.setState({ commentText: text });
    }

    sendEmail = async (to, subject, body, options = {}) => { // данная функция срабатывает на реальном устройстве
        const { cc, bcc } = options;

        let url = `mailto:${to}`;

        // Create email link query
        const query = qs.stringify({
            subject,
            body,
            cc,
            // Указывает адрес на который будет отправлена копия письма. Данному параметру может быть задано
            //  несколько E-mail адресов через специальные символы заменители запятой («%2C%20»).
            bcc
            // Указывает адрес на который будет отправлена скрытая копия письма(адрес получателя скрытого письма не
            // отображается у других получателей писем).Данному параметру может быть задано несколько E-mail
            // адресов через специальные символы заменители запятой(«% 2C % 20»).
        });

        if (query.length) {
            url += `?${query}`;
        }

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);
    }

    render() {
        const {
            title,
            sendText,
            placeholderText,
            errorText,
        } = this.props;
        const {
            numberOfStars,
            commentText,
            isShowTextarea,
            isShowError
        } = this.state;

        return (
            <View>
                <Text style={styles.titlePopUp} >{title}</Text>
                <View style={styles.wrapperStars} pointerEvents={isShowTextarea ? "none" : 'auto'} >
                    <BtnStar isChecked={numberOfStars > 0} func={() => { this.setNumberOfStars(1) }} testID="btnStar1" accessibilityLabel="btnStar1" />
                    <BtnStar isChecked={numberOfStars > 1} func={() => { this.setNumberOfStars(2) }} testID="btnStar2" accessibilityLabel="btnStar2" />
                    <BtnStar isChecked={numberOfStars > 2} func={() => { this.setNumberOfStars(3) }} testID="btnStar3" accessibilityLabel="btnStar3" />
                    <BtnStar isChecked={numberOfStars > 3} func={() => { this.setNumberOfStars(4) }} testID="btnStar4" accessibilityLabel="btnStar4" />
                    <BtnStar isChecked={numberOfStars > 4} func={() => { this.setNumberOfStars(5) }} testID="btnStar5" accessibilityLabel="btnStar5" />
                </View>

                {isShowTextarea ? (
                    <View style={{ height: 180, width: '100%', position: 'relative' }} >
                        <TextInput
                            multiline
                            numberOfLines={10}
                            onChangeText={this.setCommentText}
                            value={commentText}
                            style={styles.input}
                            textAlignVertical="top"
                            testID="rateTextarea"
                            accessibilityLabel="rateTextarea"
                            underlineColorAndroid="transparent"
                            placeholder={placeholderText}
                        />
                        {isShowError ? <Text style={styles.errorText}>{errorText}</Text> : null}
                    </View>
                ) : null}

                <View style={styles.greenBtnWrapper}>
                    <TouchableOpacity style={[styles.blueBtn, { backgroundColor: (numberOfStars > 0) ? "#1459D2" : '#FFFFFF' }]} onPress={this.submitRate} testID="submitRate" accessibilityLabel="submitRate">
                        <Text style={[styles.blueBtnText, { color: (numberOfStars > 0) ? "#FFFFFF" : '#1459D2' }]}>{sendText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
