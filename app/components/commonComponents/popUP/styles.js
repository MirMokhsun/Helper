import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    popUpWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '200%',
        height: '200%',
        top: 0,
        left: 0,
    },
    textBtn: {
        fontFamily: "Roboto-Light",
        fontSize: 16,
        textAlign: 'center',
    },
    popUp: {
        padding: 25,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
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
        width: 120,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1459D2',
        justifyContent: 'center',
        alignItems: 'center',
    },

});