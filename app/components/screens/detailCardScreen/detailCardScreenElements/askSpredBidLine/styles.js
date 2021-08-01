import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    textWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingRight: 10,
        flexDirection: 'row',
    },
    rendersNumbWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 3
    },
    textTitle: {
        fontFamily: 'Roboto-Light',
        lineHeight: 20,
        fontSize: 14,
        color: '#000756',
    },
    spredContainer: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#D3D9E7',
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    spred:{
        fontFamily: 'Roboto-Light',
        lineHeight: 25,
        fontSize: 14,
        color: '#9FA0B2',
    },
    numberContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
})