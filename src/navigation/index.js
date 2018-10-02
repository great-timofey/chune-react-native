import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationActions,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../global/colors';
import AuthScreen from '../screens/auth';
import HomeScreen from '../screens/Home';
import HomeTabView from '../components/CustomTabView';
import { HomeScreenName, AuthScreenName } from './screens';

// const HomeTab = createMaterialTopTabNavigator(
// {
// Home: HomeScreen,
// 'For You': HomeScreen,
// 'Artists & Events': HomeScreen,
// },
// {
// tabBarOptions: {
// optimizationsEnabled: true,
// style: {
// backgroundColor: colors.accent,
// height: 55,
// },
// labelStyle: {
// fontFamily: 'Roboto-Bold',
// fontSize: 14,
// },
// },
// },
// );

export const AppNavigator = createStackNavigator({
  [AuthScreenName]: {
    screen: HomeTabView,
    navigationOptions: {
      //  for debugging
      gesturesEnabled: false,
      title: 'Chune',
      headerTitleStyle: { color: 'white', fontFamily: 'Roboto-Regular' },
      headerLeft: (
        <Icon.Button
          name="menu"
          size={24}
          backgroundColor="transparent"
          iconStyle={{
            marginLeft: 10,
            marginRight: 0,
            width: 24,
            height: 24,
          }}
          borderRadius={0}
          onPress={() => alert('hi')}
        />
      ),
      headerRight: (
        <Icon.Button
          name="search"
          size={24}
          backgroundColor="transparent"
          iconStyle={{
            marginLeft: 0,
            marginRight: 10,
            width: 24,
            height: 24,
          }}
          borderRadius={0}
          onPress={() => alert('hi')}
        />
      ),
      headerStyle: {
        backgroundColor: colors.accent,
        ...Platform.select({
          ios: {
            borderTopWidth: 21,
            borderTopColor: '#52146C',
            marginBottom: 4,
            paddingTop: 20,
          },
          android: {
            elevation: 0,
          },
        }),
      },
    },
  },
  [HomeScreenName]: {
    screen: HomeScreen,
    navigationOptions: {
      //  for debugging
      gesturesEnabled: false,
      headerLeft: null,
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
