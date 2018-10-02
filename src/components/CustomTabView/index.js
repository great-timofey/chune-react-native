import React from 'react';
import { Platform } from 'react-native';

import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import colors from '../../global/colors';
import HomeScreen from '../../screens/home';
import AuthScreen from '../../screens/auth';

export default () => {
  const _renderTab = () => (
    <TabBar
      scrollContainerStyle={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      tabBarStyle={{
        height: 48,
        marginTop: 0,
        paddingTop: 20,
        backgroundColor: colors.accent,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.75,
      }}
      tabBarTextStyle={{
        color: '#D8D8D8',
        fontFamily: 'Roboto-Bold',
      }}
      activeTabTextStyle={{
        color: 'white',
      }}
      underlineHeight={Platform.OS === 'android' ? 4 : 2}
      underlineColor="white"
    />
  );

  return (
    <ScrollableTabView renderTabBar={_renderTab}>
      <HomeScreen tabLabel={{ label: 'HOME' }} />
      <HomeScreen tabLabel={{ label: 'FOR YOU' }} />
      <HomeScreen tabLabel={{ label: 'ARTISTS & EVENTS' }} />
    </ScrollableTabView>
  );
};
