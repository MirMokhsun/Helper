import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerBackgroundLight: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#D3D9E7',
        borderBottomWidth: 1,
    },
    textDate: {
        color: "#1459D2",
        fontSize: 11,
        lineHeight: 13,
        fontFamily: 'Roboto',
        marginTop: 10
    },
    circleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    circle: {
        backgroundColor: '#F86F6F',
        borderRadius: 50,
        width: 8,
        height: 8,
    },
    textDescription: {
        color: "#000756",
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto',
        marginTop: 5,
    },
});