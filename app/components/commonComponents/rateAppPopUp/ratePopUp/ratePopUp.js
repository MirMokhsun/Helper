import React from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, BackHandler, Keyboard } from 'react-native';
import { styles } from './styles';

export class RatePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: this.height,
        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPressPopup', this.hardwareBackPressPopup);
        this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
    }

    UNSAFE_componentWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPressPopup', this.hardwareBackPressPopup);
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
    }


    _keyboardWillShow(e) {
        this.setState({ height: this.height - e.endCoordinates.height });
    }

    _keyboardWillHide(e) {
        this.setState({ height: this.height });
    }

    hardwareBackPressPopup = () => {
        const { backgroundFunction } = this.props;
        backgroundFunction();
    }

    getHeightBackgroundPopUp = (event) => {
        const { height } = event.nativeEvent.layout;
        this.height = height;
    }

    render() {
        const {
            width,              // ширина попапа, обязательна
            backgroundFunction, // функция которая вешаеться на пространство за попапом, закрывающая
            topComponent,       // дополнительный компонент, елси его нет, то можно не чего не вводить
            title,              // основной текст, необязателен
            textBtn,            // текст первой кнопки
            functionBtn,        // функция первой кнопки
            textBtnWhite,       // текст второй кнопки, если ее нет то, false
            functionBtnWhite    // функция второй кнопки, если ее нет то, false
        } = this.props;
        const { height } = this.state;
        return (
            <TouchableWithoutFeedback testID="closePopupID" accessibilityLabel="closePopupID" onPress={backgroundFunction}>
                <View style={[styles.background, { maxHeight: height }]} onLayout={this.getHeightBackgroundPopUp} >
                    <TouchableWithoutFeedback onPress={() => {
                        Keyboard.dismiss();
                    }} >
                        <View style={[styles.popUp, { width }]}>
                            {/* в блоке ниже будет свг или дополнительный текст */}
                            {topComponent || null}
                            {/* ниже тайтл */}
                            {title ? (
                                <View style={styles.tileWrapper}>
                                    <Text style={styles.titleText}>{title}</Text>
                                </View>
                            ) : null}
                            <View style={styles.btnWrapper}>
                                {/* Белая кнопка */}
                                {textBtnWhite ? (
                                    <TouchableOpacity onPress={functionBtnWhite} style={styles.btnWhite} testID="leftBtnPopupID" accessibilityLabel="leftBtnPopupID"    >
                                        <Text style={[styles.textBtn, { color: '#1459D2' }]}>{textBtnWhite}</Text>
                                    </TouchableOpacity>
                                ) : null}
                                {/* Синяя кнопка */}
                                {textBtn ? (
                                    <TouchableOpacity onPress={functionBtn} style={styles.btn} testID="rightBtnPopupID" accessibilityLabel="rightBtnPopupID" >
                                        <Text style={[styles.textBtn, { color: '#1459D2' }]}>{textBtn}</Text>
                                    </TouchableOpacity>
                                ) : null}
                                {/*  */}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback >
        );
    }
}
