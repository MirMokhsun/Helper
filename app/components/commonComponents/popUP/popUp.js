import React from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, BackHandler } from 'react-native';
import { styles } from './styles';

export class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPressPopup', this.hardwareBackPressPopup);
    }

    UNSAFE_componentWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPressPopup', this.hardwareBackPressPopup);
    }

    hardwareBackPressPopup = () => {
        const { backgroundFunction } = this.props;
        backgroundFunction();
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
        return (
            <TouchableWithoutFeedback testID="closePopupID" accessibilityLabel="closePopupID" onPress={backgroundFunction}>
                <View style={styles.popUpWrapper}>
                    {/* ниже костыль для заднего фона, почему-то связь с брокером показывает задний фон меньше, чем к примеру выход */}
                    <View style={styles.background} /> 
                    <TouchableWithoutFeedback onPress={() => {
                        console.log('click on background popUp')
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
                                        <Text style={[styles.textBtn, { color: '#FFFFFF' }]}>{textBtn}</Text>
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
