import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        height: 45,
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'center',
        borderRadius: 24,
    },
    btnBackgroundColorGreen: {
        backgroundColor: '#1459D2',
    },
    btnBackgroundColorDarkGrey: {
        backgroundColor: '#1D2E3E',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Roboto-Light',
        color: "#FFFFFF",
    },
    textColorWhite: {
        color: "#FFFFFF",
    },
    textColorGrey: {
        color: "#5A6772",
    },
    containerSpiner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 24,
    },
});