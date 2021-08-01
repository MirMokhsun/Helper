import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';
import Utils from '../../../api/utils/utils';
import ArrowBack from '../svg/ArrowBack';
import ArrowBackIOS from '../svg/ArrowBackIOS';

const { isIOS } = Utils;

export class ButtonBack extends React.Component {
    constructor(props) {
        super(props);
        const { color } = props;
        this.previousSvg = this.getPreviousSvg( color );
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    getPreviousSvg = (color) => {
        let result = <ArrowBack  color = {color || '#fff'}  />;
        if (isIOS) {
            result = <ArrowBackIOS color = {color || '#fff'} width={20} height={20} />;
        }
        return result;
    }

    render() {
        const { id } = this.props;
        return (
            <TouchableOpacity testID = {`ButtonBack${id}ID`} accessibilityLabel={`ButtonBack${id}ID`} onPress={this.goBack}>
                <View style={styles.container}>
                    {this.previousSvg}
                </View>
            </TouchableOpacity >
        );
    }
}

export default withNavigation(ButtonBack);