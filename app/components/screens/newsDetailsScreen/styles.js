import { StyleSheet } from 'react-native';
import Utils from '../../../api/utils/utils';
const { width } = Utils.size;

export const styles = StyleSheet.create({
    stillNewscontainer: {
        flex: 1,
        width: '100%',
    },
    stillNewsTitleText: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#1459D2',
        lineHeight: 40,
    },
    stillNewsTitleWrapper: {
        height: 40,
    },
    wrapperSelectNews: {
        flex: 1,
        marginTop: 10,
        width: width - 20,
        backgroundColor: '#FFFFFF'
    },
    wrapperStillNews: {
        width: width - 20,
        backgroundColor: '#ffffff'
    },
    wrapper: {
        width: width,
        // height: height-40,
        height: '100%',
        alignItems: "center",
        backgroundColor: '#ffffff'
    },
    imageSelectStyle: {
        width: '100%',
        height: 200,
    },
    imageContainner: {
        height: 200,
    }, textNewsStyle: {
        marginTop: 15,
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
        marginTop: 10,
        marginLeft: 5,
        flexDirection: 'row',
    },
    maincontainer: {
        width: '100%',
    }, imageStyle: {
        position: "absolute",
        top: -70,
        width: '100%',
        height: 300,
    },
});