import { StyleSheet } from 'react-native';
import Utils from '../../../../../api/utils/utils';

const { width } = Utils.size;

export const styles = StyleSheet.create({
    searchInputContent: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#5A6772",
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        height: 40,
        width: width - 100,
        backgroundColor: '#E5E5E5',
    },
    svg: {
        width: 24,
        height: 24
    },
    svgContainer: {
        width: 56,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        padding: 0,
        marginRight: 10,

    },
    textinputWithTextAlightRight: {
        textAlign: 'right',
        flex: 1,
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        padding: 0,
        marginRight: 10,
    },
});