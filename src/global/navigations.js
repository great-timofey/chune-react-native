import R from 'ramda';
import React from 'react';
import { Alert, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from './colors';
import styles from './styles';
import { platformSelect } from './utils';
import { HomeScreenName, AuthScreenName } from '../navigation/screens';

import { store } from '../redux/store';
// import FAQScreen from '../screens/faq';
import AuthScreen from '../screens/auth';
import ModalScreen from '../screens/modal';
// import DrawerMenuScreen from '../screens/modal';
import HomeTabView from '../components/TabView';
// import TermsConditionsScreen from '../screens/t&c';
import { userLogout } from '../redux/auth/actions';
import PrivacyPolicyScreen from '../screens/privacyPolicy';
import { setDataArtistsEventsSingle } from '../redux/data/actions';
// export const authStack = generateRoutes(auth);

const iconProps = {
  size: 24,
  borderRadius: 0,
  iconStyle: styles.iconStyle,
  backgroundColor: colors.transparent,
};

export const headerLeft = (
  iconName = 'menu',
  undrillCallback,
  drawerCallback,
) => (
  <Icon.Button
    {...iconProps}
    name={iconName}
    onPress={() => {
      iconName === 'arrow-back' ? undrillCallback() : drawerCallback();
      /* Alert.alert(
          'Do you really want to log out?',
          null,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => store.dispatch(userLogout({})),
            },
          ],
          { cancelable: false },
        ); */
    }}
  />
);

const headerRight = (
  <View style={{ paddingRight: 10 }}>
    <Icon.Button
      {...iconProps}
      name="search"
      onPress={() => store.dispatch({ type: 'TOGGLE_SEARCH' })}
    />
  </View>
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
};

const generateStack = (RouteConfigs, StackNavigatorConfig = authConfigs) => createStackNavigator(RouteConfigs, StackNavigatorConfig);

export const RootNavigator = generateStack(rootStack, {
  navigationOptions: { gesturesEnabled: false },
});

export const MainNavigator = createDrawerNavigator({
  Home: {
    screen: RootNavigator,
  },
  // 'Terms and Conditions': {
  // screen: TermsConditionsScreen,
  // },
  'Privacy Policy': {
    screen: PrivacyPolicyScreen,
    navigationOptions: {
      title: 'Chune Supply',
      gesturesEnabled: false,
      headerTitleStyle: { color: 'white', fontFamily: 'Roboto-Regular' },
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
  // FAQ: {
  // screen: FAQScreen,
  // },
});

export const Auth = generateStack(authStack);
