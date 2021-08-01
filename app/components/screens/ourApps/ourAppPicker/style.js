import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 90,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D9E7',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#000756',
        lineHeight: 65,
        marginLeft: 24,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 5,
    }
});