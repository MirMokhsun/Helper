import { StyleSheet } from 'react-native';
import Utils from '../../../../../api/utils/utils';

const { width } = Utils.size;

export const styles = StyleSheet.create({
    imageContainner: {
        position: "relative",
        height: 80,
        overflow: "hidden",
        zIndex: -2,
    },
    maincontainer: {
        width: width - 20,
        marginBottom: 20,
    }, imageStyle: {
        width: '100%',
        height: 80
    }, textNewsStyle: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        lineHeight: 20,
        color: '#000756'
    }, timeNewsStyle: {
        fontFamily: 'Roboto-Light',
        fontSize: 11,
        lineHeight: 13,
        color: '#1459D2'
    }, marginText: {
        marginLeft: 15,
    }, timeNewsWrapper: {
        flexDirection: 'row',
    }
});
