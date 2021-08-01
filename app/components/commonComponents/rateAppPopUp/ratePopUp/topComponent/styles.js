import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    titlePopUp: {
        color: "#000756",
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15,
    },
    blueBtnText: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular'
    },
    blueBtn: {
        width: "80%", 
        height: 50,
        borderColor: '#1459D2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    greenBtnWrapper: {
        width: "100%",
        alignItems: 'center',
        marginBottom: 25
    },
    wrapperStars: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 25,
        marginBottom: 25
    },
    input: {
        backgroundColor: '#FFFFFF',
        height: 150,
        maxHeight: 150,
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#D3D9E7",
    },
    errorText: {
        position: "absolute",
        top: 150,
        width: '100%',
        textAlign: 'center',        
        color: "#F86F6F",
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 17,
    },
});