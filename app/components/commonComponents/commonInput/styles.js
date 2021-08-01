import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
    },
    textinputwrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#1459D2",
        paddingRight: 5,
    },
    textinputWithTextAlightRight: {
        textAlign: 'right',
    },
    textinput: {
        flex: 1,
        padding: 0,
        height: "100%",
        backgroundColor: 'white',
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: "#1459D2",
        marginRight: 10,
    },
    warningStyle: {
        borderColor: "#F86F6F"
    },
    borderGray: {
        borderColor: "#D3D9E7"
    },
});