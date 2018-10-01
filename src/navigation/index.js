import React from 'react';
import {
  View, TouchableOpacity, Text, TouchableHighlight,
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
import CustomTabView from '../components/CustomTabView';
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
    // screen: AuthScreen,
    screen: CustomTabView,
    // navigationOptions: {
    // //  for debugging
    // gesturesEnabled: false,
    // headerLeft: (
    // <Icon.Button
    // name="menu"
    // size={24}
    // backgroundColor="transparent"
    // iconStyle={{
    // marginLeft: 5,
    // marginRight: 0,
    // width: 24,
    // height: 24,
    // }}
    // borderRadius={0}
    // onPress={() => alert('hi')}
    // />
    // ),
    // headerStyle: {
    // borderTopWidth: 20,
    // borderTopColor: '#52146C',
    // paddingTop: 20,
    // backgroundColor: colors.accent,
    // borderBottomWidth: 0,
    // },
    // },
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
