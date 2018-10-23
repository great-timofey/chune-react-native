import R from 'ramda';
import React from 'react';
import { Alert, View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from './colors';
import styles from './styles';
import { platformSelect } from './utils';
import { HomeScreenName, AuthScreenName } from '../navigation/screens';

import { isIphoneX } from './utils';
import { store } from '../redux/store';
import FAQScreen from '../screens/faq';
import AuthScreen from '../screens/auth';
import ModalScreen from '../screens/modal';
import HomeTabView from '../components/TabView';
import SideDrawer from '../components/SideDrawer';
import TermsConditionsScreen from '../screens/t&c';
import { toggleSearch } from '../redux/common/actions';
import PrivacyPolicyScreen from '../screens/privacyPolicy';
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
    }}
  />
);

const headerRight = (
  <View style={{ paddingRight: 10 }}>
    <Icon.Button
      {...iconProps}
      name="search"
      onPress={() => store.dispatch(toggleSearch())}
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
            borderTopWidth: /* isIphoneX ? 31 : */ 21,
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

const TermsConditionsNavigator = createStackNavigator(
  {
    TermsConditions: { screen: TermsConditionsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      initialRouteName: 'TermsConditions',
      headerTitle: 'Terms and Conditions',
      headerLeft: () => (
        <Icon.Button
          {...iconProps}
          name="arrow-back"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    }),
  },
);

const PrivacyPolicyNavigator = createStackNavigator(
  {
    'Privacy Policy': { screen: PrivacyPolicyScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      initialRouteName: 'PrivacyPolicy',
      headerTitle: 'Privacy Policy',
      headerLeft: () => (
        <Icon.Button
          {...iconProps}
          name="arrow-back"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    }),
  },
);

const FAQNavigator = createStackNavigator(
  {
    FAQScreen: { screen: FAQScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      initialRouteName: 'FAQ',
      headerTitle: 'FAQ',
      headerLeft: () => (
        <Icon.Button
          {...iconProps}
          name="arrow-back"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    }),
  },
);

export const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: RootNavigator,
    },
    'Terms and Conditions': {
      screen: TermsConditionsNavigator,
    },
    FAQ: {
      screen: FAQNavigator,
    },
    'Privacy Policy': {
      screen: PrivacyPolicyNavigator,
    },
  },
  {
    contentComponent: SideDrawer,
  },
);

export const Auth = generateStack(authStack);
