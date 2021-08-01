import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 290,
        marginBottom: 25,
        // backgroundColor:'red'
    },
    link: {
        textDecorationLine: 'underline',
        textAlign: 'left'
    },
    text: {
        color: '#9FA0B2',
        fontSize: 12,
        fontFamily: 'Roboto-Light',
        lineHeight: 14,
        textAlignVertical: 'bottom',
        marginLeft: 10,
        textAlign: 'left',
    },
    linkwrapper: {
        width: 260,
        flexDirection: 'column',
    },
    checkBox: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9FA0B2',
        borderWidth: 0.5
    },
    linkedTextWrapper: {
        width: 260,
    },
});