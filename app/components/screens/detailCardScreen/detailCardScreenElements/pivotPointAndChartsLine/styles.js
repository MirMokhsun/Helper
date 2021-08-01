import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Roboto-Light',
        lineHeight: 27,
        fontSize: 14,
        color: '#000756',
        marginRight: 10,
    },
    piwotPointWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    toogleWrapper: {
        flex: 2,
        justifyContent: 'center',
    },
    containerPivotPoint: {
        flexDirection: 'row',
        height: 25,
        justifyContent: 'center',
    },
    whiteNumbers: {
        lineHeight: 25,
        fontSize: 20,
        color: "#9FA0B2",
        fontFamily: 'Roboto-Regular',
    },
    largeNumbers: {
        paddingTop: 0.5,
        fontSize: 23,
    },
    valuestyle: {

    },
})