import React from 'react';

import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import colors from '../../global/colors';
import HomeScreen from '../../screens/Home';
import AuthScreen from '../../screens/auth';

export default () => (
  <ScrollableTabView
    renderTabBar={() => (
      <TabBar
        scrollContainerStyle={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
        }}
        tabBarStyle={{
          height: 48,
          marginTop: 0,
          paddingTop: 20,
          backgroundColor: colors.accent,
        }}
        tabBarTextStyle={{
          color: '#D8D8D8',
          fontFamily: 'Roboto-Bold',
        }}
        activeTabTextStyle={{
          color: 'white',
        }}
        underlineColor="white"
      />
    )}
  >
    <HomeScreen tabLabel={{ label: 'HOME' }} />
    <HomeScreen tabLabel={{ label: 'FOR YOU' }} />
    <HomeScreen tabLabel={{ label: 'ARTISTS & EVENTS' }} />
  </ScrollableTabView>
);
