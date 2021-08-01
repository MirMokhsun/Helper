import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(23, 37, 51, 0.9)',
    },
    textBtn: {
        fontFamily: "Roboto-Light",
        fontSize: 16,
        textAlign: 'center',
    },
    popUp: {
        padding: 15,
        paddingBottom: 25,
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        borderRadius: 15,
    },
    tileWrapper: {
        marginBottom: 15
    },
    titleText: {
        lineHeight: 22,
        fontFamily: "Roboto-Light",
        fontSize: 16,
        textAlign: 'center',
        color: '#000756',
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnWhite: {
        width: 118,
        height: 38,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1459D2',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: "100%",
        height: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

});