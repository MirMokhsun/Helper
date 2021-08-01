import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import EmptyNotificationSVG from '../../../commonComponents/svg/EmptyNotificationSVG';

export class EmptyNotification extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { text } = this.props;
        return (
            <View style={styles.container} >
                <EmptyNotificationSVG />
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
        );
    }
}   