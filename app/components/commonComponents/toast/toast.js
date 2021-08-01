import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import store from '../../../redux/store/store';

export class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.hideToast = props.hideToast
    }

    componentDidUpdate(prevProps) {
        const { isVisibleToast } = this.props;
        if (prevProps.isVisibleToast === false && isVisibleToast === true) {
            setTimeout(() => {
                store.dispatch(this.hideToast());
            }, 3000);
        }

    }

    render() {
        const { toastText, isVisibleToast } = this.props;
        const toast = isVisibleToast ? (
            <View style={styles.background} pointerEvents="none">
                <View style={{ backgroundColor: '#666', borderRadius: 30, padding: 15 }}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{toastText}</Text>
                </View>
            </View>
        ) : null;
        return toast;
    }
}
