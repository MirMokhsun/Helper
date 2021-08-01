import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
    },
    svgContainer: {
        flex: 4,
        flexDirection: 'column-reverse',
        alignItems: 'center'
    },
    svgContainerLong: {
        flex: 3,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingLeft: 15,
    },
    textContainer: {
        flex: 4
    },
    textContainerLong: {
        flex: 4,
    },
    title: {
        fontFamily: 'Roboto-Light',
        color: '#000756',
        fontSize: 16,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Roboto-Light',
        color: '#9FA0B2',
        fontSize: 11,
        textAlign: 'center',
        marginTop: 5
    },
    bottomLine: {
        height: 2,
        width: 'auto',
        marginHorizontal: 28,
    },
    flex1: {
        flex: 1
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F86F6F',
        position: 'absolute',
        top: -8,
        right: -8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontFamily: 'Roboto-Light',
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    }
});