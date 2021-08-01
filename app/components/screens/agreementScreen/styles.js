import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scroll: {
        paddingTop: 20
    },
    wrapper: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#F5F5F7',
    },
    regularText: {
        textAlign: 'left',
        color: '#000756',
        fontSize: 12,
        fontFamily: 'Roboto-Light',
        lineHeight: 16,
        marginBottom: 15,
        marginRight: 10,
        marginLeft: 10,
    },
    titleText: {
        textAlign: 'left',
        color: '#1459D2',
        fontSize: 16,
        fontFamily: 'Roboto-Light',
        lineHeight: 18,
        marginBottom: 15,
        marginRight: 10,
        marginLeft: 10,
    }, 
    buttonWrapper:{
        marginVertical:35,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})