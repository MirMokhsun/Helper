import { StyleSheet, I18nManager } from 'react-native';
import Utils from '../../../api/utils/utils';

const isIOS = Utils.isIOS;
export const styles = StyleSheet.create({
    container: {
        paddingLeft: isIOS ? 5 : 20,
        paddingRight: isIOS ? 5 : 20,
        transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : [],
        width: 25,
        height: 25,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});