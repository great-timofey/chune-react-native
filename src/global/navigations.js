import R from 'ramda';
import React from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from './colors';
import styles from './styles';
import { platformSelect } from './utils';
import { HomeScreenName, AuthScreenName } from '../navigation/screens';

import { store } from '../redux/store';
import AuthScreen from '../screens/auth';
import HomeScreen from '../screens/home';
import ModalScreen from '../screens/modal';
import HomeTabView from '../components/TabView';
import { userLogout } from '../redux/auth/actions';
// export const authStack = generateRoutes(auth);

const iconProps = {
  size: 24,
  borderRadius: 0,
  iconStyle: styles.iconStyle,
  backgroundColor: colors.transparent,
};

const headerLeft = (
  <Icon.Button
    {...iconProps}
    name="menu"
    onPress={() => {
      Alert.alert(
        'Do you really want to log out?',
        null,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => store.dispatch(userLogout({})) },
        ],
        { cancelable: false },
      );
    }}
  />
);

const headerRight = (
  <Icon.Button {...iconProps} name="search" onPress={() => alert('hi')} />
);

const navigators = {};

export function setNavigatior(routeName: string, navigator) {
  if (navigator) {
    const { subs } = navigator;
    if (subs) {
      subs.remove();
    }
    navigators[routeName] = navigator;
  }
}

const authStack = {
  [AuthScreenName]: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'Chune',
      gesturesEnabled: false,
      headerTitleStyle: { color: 'white', fontFamily: 'Roboto-Regular' },
      headerLeft,
      headerRight,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: colors.accent,
        ...platformSelect(
          {
            paddingTop: 20,
            marginBottom: 4,
            borderTopWidth: 21,
            borderTopColor: colors.statusBar,
          },
          {
            elevation: 0,
          },
        ),
      },
    },
  },
};

const authConfigs = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: colors.white,
  },
  navigationOptions: { gesturesEnabled: false },
};

const rootStack = {
  [HomeScreenName]: {
    screen: HomeTabView,
    navigationOptions: {
      title: 'Chune Supply',
      gesturesEnabled: false,
      headerTitleStyle: { color: 'white', fontFamily: 'Roboto-Regular' },
      headerLeft,
      headerRight,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: colors.accent,
        ...platformSelect(
          {
            paddingTop: 20,
            marginBottom: 4,
            borderTopWidth: 21,
            borderTopColor: '#52146C',
          },
          {
            elevation: 0,
          },
        ),
      },
    },
  },
  ModalScreen: {
    screen: ModalScreen,
  },
  // [HomeScreenName]: {
  //   screen: HomeScreen,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //     headerLeft: null,
  //   },
  // },
};

// export const routesList: Array<string> = [...auth, ...main];

// const generateRoutes = list => R.reduce(
//   (acc, route) => ({ ...acc, [route]: { screen: scr[route] } }), {}, list,
// );

const generateStack = (RouteConfigs, StackNavigatorConfig = authConfigs) => createStackNavigator(RouteConfigs, StackNavigatorConfig);

export const RootNavigator = generateStack(rootStack, {
  navigationOptions: { gesturesEnabled: false },
});

export const Auth = generateStack(authStack);
