import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 'auto',
        minHeight: 66,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D9E7',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#000756',
        lineHeight: 21,
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
    },
    circleWrapper: {
        width: '20%',
        height: 65,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#EBECEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleChecked: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#1459D2',
    }
});