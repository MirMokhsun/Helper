import { StyleSheet } from 'react-native';
import Utils from '../../../api/utils/utils';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000756',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: { 
        height: this.scaleHeight, 
        width: this.scaleWidth, 
        opacity: this.scaleOpacity, 
    },
})