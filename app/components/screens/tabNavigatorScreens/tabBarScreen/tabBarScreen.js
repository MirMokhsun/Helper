import React from 'react';
import { View, BackHandler } from 'react-native';
import { styles } from './styles';
import { TabAppNavigator } from '../../../navigators/tabNavigator';
import ToolbarInTabbar from './toolbarInTabbar/toolbarInTabbar';
import Utils from '../../../../api/utils/utils';

const { isIphoneX } = Utils;

export default class TabBarScreen extends React.Component {
    static navigationOptions = () => {
        return {
            gesturesEnabled: false,
            header: <ToolbarInTabbar />,
        }
    };

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackTabBarScreen', this.hardwareBackTabBarScreen);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackTabBarScreen', this.hardwareBackTabBarScreen);
    }

    hardwareBackTabBarScreen = () => {
        const {  navigation } = this.props;
        if ( navigation.isFocused()) {
            BackHandler.exitApp();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabAppNavigator />
                {isIphoneX ? <View style={ styles.indentFroIphoneX} /> : null}
            </View>
        )
    }
}