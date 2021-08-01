import { StyleSheet, I18nManager } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 75,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    wrapper: {
        borderLeftWidth: 1,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    starWrapper: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowWrapper: {
        marginLeft: 10,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullNameText: {
        fontFamily: 'Roboto-Light',
        lineHeight: 32,
        fontSize: 14,
        color: '#000756',
        flex: 2,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    quotationContainer: {
        flex: 3,
        flexDirection: 'column',
    }
})