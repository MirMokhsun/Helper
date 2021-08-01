import React from 'react';
import { Text, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { styles } from './style';
import AppLink from 'react-native-app-link';

export class OurAppPicker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    goToStore = () => {
        const {
            playStoreId,
            appStorelink
        } = this.props;

        if(Platform.OS === 'ios'){
            Linking.openURL(appStorelink);
        } else {
            AppLink.openInStore({
                playStoreId
            }).then(() => {
                console.warn('opened');
            })
        }
    }

    render() {
        const { text, image, id } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.goToStore} testID = {`ourAppPicker${id}ID`} accessibilityLabel={`ourAppPicker${id}ID`}>
                {image ? <Image source={image} style={styles.image} /> : null}
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }
}   
