import { StyleSheet, I18nManager } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Roboto-Light',
        lineHeight: 20,
        fontSize: 15,
        color: '#000756',
    },
    textWrapper:{
        flex: 2,
        justifyContent: 'flex-end',
        paddingRight: 10,
        flexDirection: 'row',
    },
    rendersNumbWrapper: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        flex: 3
    },
    whiteNumbers: {
        lineHeight: 20,
        fontSize: 15,
        color: "#9FA0B2",
        fontFamily: 'Roboto-Light',
    },
    largeNumbers: {
        paddingTop: 0.5,
        fontSize: 18,
    },
    valuestyle: {

    },
    redNumbers: {
        lineHeight: 20,
        fontSize: 15,
        color: "#F86F6F",
        fontFamily: 'Roboto-Light',
    },
    greenNumbers: {
        lineHeight: 20,
        fontSize: 15,
        color: "#1459D2",
        fontFamily: 'Roboto-Light',
    },
})