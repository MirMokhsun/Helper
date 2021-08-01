import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, I18nManager } from 'react-native';
import TabAppNavigator from './tabNavigator';
import ToolbarInTabbar from '../screens/tabNavigatorScreens/tabBarScreen/toolbarInTabbar/toolbarInTabbar';

const StackNavigatorConfig = {
    navigationOptions: ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null,
            title: 'text',
            headerTitleStyle: {
                color: "#FFFFFF",
                alignSelf: 'center',
                width: '100%',
                height: '100%',
                textAlign: "center",
                fontSize: 16,
                lineHeight: 40,
                ...Platform.select({
                    ios: {
                        paddingRight: 0,
                    },
                    android: {
                        paddingRight: I18nManager.isRTL ? 0 : 30,
                        paddingLeft: I18nManager.isRTL ? 30 : 0,
                    },
                }),
                fontFamily: 'Roboto-Regular',
                fontWeight: 'normal',
                backgroundColor: "#FFFFFF",
            },
            headerStyle: {
                backgroundColor: "#FFFFFF",
                paddingTop: Platform.OS === 'ios' ? 20 : 10,
                borderBottomColor: "transparent",
                shadowOpacity: 0,
                elevation: 0,
            },
        }
    }
};

const StackNavigatorForTabBar = createStackNavigator(
    {
        TabAppNavigator: {
            screen: TabAppNavigator,
            navigationOptions: ({ navigation }) => {
                return {
                    ...StackNavigatorConfig.navigationOptions,
                    gesturesEnabled: false,
                    header: <ToolbarInTabbar navigation={navigation} />,
                }
            },
        }
    },
    StackNavigatorConfig
);

export default StackNavigatorForTabBar;