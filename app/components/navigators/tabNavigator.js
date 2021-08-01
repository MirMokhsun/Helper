import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import CatalogScreen from '../screens/tabNavigatorScreens/catalogScreen/catalog';
import HelpScreen from '../screens/tabNavigatorScreens/helpScreen/help';
import RestScreen from '../screens/tabNavigatorScreens/restScreen/rest';
import NewsScreen from '../screens/tabNavigatorScreens/newsScreen/news';
import Utils from '../../api/utils/utils';
import TabBarComponent from './tabBarComponent';

const { isIphoneX } = Utils;

const screens = {
  Catalog: {
    screen: CatalogScreen,
  },
  News: {
    screen: NewsScreen,
    path: '/',
  },
  Help: {
    screen: HelpScreen,
    path: '/',
  },
  Other: {
    screen: RestScreen,
    path: '/',
  }
};

const tabbarOption = {
  backgroundColor: '#fff',
  inactiveBackgroundColor: '#fff',
  activeBackgroundColor: '#fff',
  activeTintColor: '#1459D2',
  inactiveTintColor: '#000756',
  style: {
    borderTopColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(20, 89, 210, 0.15)',
    shadowRadius: 4,
    ...Platform.select({
      ios: {
        minHeight: isIphoneX ? 90 : 58,
        height: isIphoneX ? 90 : 58,
        maxHeight: isIphoneX ? 90 : 58,
        shadowOpacity: 1,
        zIndex: 1,
      },
      android: {
        minHeight: 58,
        height: 58,
        maxHeight: 58,
        shadowOpacity: 1,
        elevation: 4,
        zIndex: 2,
      },
    }),
  },
  labelStyle: {
    marginBottom: 10,
    marginTop: 0,
    width: isIphoneX ? 70 : 'auto'
  },
  tabStyle: {
    paddingTop: 10,
  }
};

const TabAppNavigator = createBottomTabNavigator(screens,
  {
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: tabbarOption,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    backBehavior: 'none',
    lazy: false,
    safeAreaInset: { bottom: 'always', top: 'never' }
  }
);

export default TabAppNavigator;