import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapperToogle: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    containerToogle: {
        width: 130,
        height: 32,
        backgroundColor: '#EBECEE',
        borderRadius: 16,
        padding: 4
    },
    wrapperImageInToogle: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        zIndex: 2,
    },
    sliderInToogle: {
        width: '50%',
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF'
    },
    imageInToogle: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});