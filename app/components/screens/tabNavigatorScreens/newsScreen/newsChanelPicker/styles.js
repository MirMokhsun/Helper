import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    newsChanelPicker: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 100,
        elevation: 4,
        marginTop: 5,
        position: 'absolute',
        overflow: 'hidden',
    },
    titleBtn: {
        borderTopRightRadius:  25, 
        borderTopLeftRadius:  25,
        width: '100%',
        height: 45,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    svg: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        lineHeight: 45,
        color: '#000756',
        fontSize: 14,
        fontFamily: 'Roboto'
    },
    bottomBlock: {
        width: '100%',
        backgroundColor: '#ffffff',
        top: 0,
        // height: 120,
        flex:1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    bottomText: {
        alignItems: 'center',
        color: '#000756',
        fontSize: 14,
        fontFamily: 'Roboto',
        paddingLeft: 20,
    },
});