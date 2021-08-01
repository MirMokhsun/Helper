import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    countryContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: "#5A6772",
    },
    flagnadname: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "75%",
        marginRight: 5,
        marginLeft: 5,
    },
    wrapper: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Roboto-Light',
        color: '#1459D2',
        marginRight: 15,
        marginLeft: 5,
    },
    imagewrapper: {
        height: 30,
        width: 30,
        marginRight: 5,
        marginLeft: 10,
    },
    image: {
        height: 30,
        width: 30,
    },
});