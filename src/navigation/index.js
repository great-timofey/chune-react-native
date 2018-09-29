import React from 'react';
import { createStackNavigator, NavigationActions } from 'react-navigation';

import Auth from '../scenes/Auth';
import Home from '../scenes/Home';
import { HomeScene, AuthScene } from './scenes';

export const AppNavigator = createStackNavigator({
  [AuthScene]: {
    screen: Auth,
  },
  [HomeScene]: {
    screen: Home,
    navigationOptions: {
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
