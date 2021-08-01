import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
    wrapperToogle: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    containerTraidingApp: {
        width: 'auto',
        minHeight: 66,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D9E7',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonTraidingApp: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#000756',
        lineHeight: 21,
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
    },
    containerToogle: {
        width: '100%',
        height: 32,
        backgroundColor: '#EBECEE',
        borderRadius: 16,
        padding: 4
    },
    wrapperTextInToogle: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        zIndex: 2
    },
    textInToogle: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16
    },
    sliderInToogle: {
        width: '50%',
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF'
    },
    activeTab: {
        fontFamily: 'Roboto-Bold',
        color: "#000756"
    },
    notActiveTab: {
        fontFamily: 'Roboto-Light',
        color: "#9FA0B2"
    },
});