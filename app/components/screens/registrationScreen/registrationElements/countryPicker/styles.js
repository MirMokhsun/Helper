import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        width: 290,
        height: 40,
        padding: 0,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        borderBottomWidth: 1,
        borderColor: "#1459D2",
        paddingRight: 5,
        marginBottom: 10,
    },
    activetext: {
        fontSize: 18,
        fontFamily: 'Roboto-Light',
        color: '#1459D2',
        lineHeight: 21,
        textAlign: 'left',
    },
    svgWrapper: {
        width: 55,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
    },
    textWrapper: {
        width: 235,
        height: 40,
        justifyContent: 'center',
    }
});