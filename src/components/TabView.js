import { Platform } from 'react-native';
import React, { Component, Fragment } from 'react';

import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Player from './Player';
import colors from '../global/colors';
import HomeScreen from '../screens/home';
import PlayerSwiper from './PlayerSwiper';

export default class TabView extends Component {
  state = {
    isPlayerOpen: false,
  };

  togglePlayer = () => this.setState(({ isPlayerOpen }) => ({
    isPlayerOpen: !isPlayerOpen,
  }));

  renderTab = () => (
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

  render() {
    const { isPlayerOpen } = this.state;
    return (
      <Fragment>
        <ScrollableTabView renderTabBar={this.renderTab}>
          <HomeScreen tabLabel={{ label: 'HOME' }} />
          <HomeScreen tabLabel={{ label: 'FOR YOU' }} />
          <HomeScreen tabLabel={{ label: 'ARTISTS & EVENTS' }} />
        </ScrollableTabView>
        <PlayerSwiper
          isAuthorized={!1}
          header="Top Tracks Chart"
          showCallback={this.togglePlayer}
          prevCallback={() => alert('prev')}
          playCallback={() => alert('play')}
          nextCallback={() => alert('next')}
        />
        <Player isVisible={isPlayerOpen} callback={this.togglePlayer} />
      </Fragment>
    );
  }
}
