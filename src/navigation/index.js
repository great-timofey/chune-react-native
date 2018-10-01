import React from 'react';
import { createStackNavigator, NavigationActions } from 'react-navigation';

import AuthScreen from '../screens/auth';
import HomeScreen from '../screens/Home';
import { HomeScreenName, AuthScreenName } from './screens';

export const AppNavigator = createStackNavigator({
  [AuthScreenName]: {
    screen: AuthScreen,
  },
  [HomeScreenName]: {
    screen: HomeScreen,
    navigationOptions: {
      //  for debugging
      // gesturesEnabled: false,
      // headerLeft: null,
    },
  },
});

let navigatorRef;
export const navigate = (routeName, params) => {
  navigatorRef.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

export default () => (
  <AppNavigator
    ref={(ref) => {
      navigatorRef = ref;
    }}
  />
);
