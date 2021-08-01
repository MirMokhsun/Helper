import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
        lineHeight: 24,
        fontSize: 12,
        color: '#9FA0B2',
    },
    activeText: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        lineHeight: 24,
        fontSize: 12,
        color: '#000756',
    },
});