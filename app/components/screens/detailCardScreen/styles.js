import { StyleSheet } from 'react-native';
import Utils from '../../../api/utils/utils';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F7',
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    chartContainer: {
        flex: 1,
        marginBottom: Utils.isIphoneX ? 30 : 0,
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 34,
    },
    titleStyle: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        lineHeight: 28,
        fontSize: 22,
        color: '#000756',
    },
    starWrapper: {
        marginLeft: 10,
        width: 24,
    },
    containerIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        marginLeft: 18,
    },
    idicatortextStyle: {
        fontFamily: 'Roboto-Light',
        lineHeight: 18,
        fontSize: 14,
        marginRight: 10,
    },
});