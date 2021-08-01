import { StyleSheet } from 'react-native';
import Utils from '../../../../api/utils/utils';

const { width } = Utils.size;

export const styles = StyleSheet.create({
    wrapper: {
        width,
        height: '100%',
        alignItems: "center",
        backgroundColor: '#F5F5F5'
    },
    container: {
        marginTop: 60,
        marginBottom: 10,
        flex: 1,
        backgroundColor: '#F5F5F5'
    }, imageStyle: {
        position: "absolute",
        top: -70,
        width: '100%',
        height: 300,
    },
});