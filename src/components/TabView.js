import {
  Platform, WebView, Text, TouchableOpacity,
} from 'react-native';
import React, { Component, Fragment } from 'react';

import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Player from './Player';
import colors from '../global/colors';
import HomeScreen from '../screens/home';
import BlogScreen from '../screens/blog';
import ForYouScreen from '../screens/for-you';
import ArtistsEventsScreen from '../screens/artists-events';
import PlayerSwiper from './PlayerSwiper';

export default class TabView extends Component {
  state = {
    isPlayerOpen: false,
    url: '',
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

  handleModal = (url) => {
    const { navigation } = this.props;
    this.setState({ url });
    navigation.navigate('ModalScreen', { url });
  };

  render() {
    const { isPlayerOpen, url } = this.state;
    return (
      <Fragment>
        <ScrollableTabView renderTabBar={this.renderTab}>
          <HomeScreen
            tabLabel={{ label: 'HOME' }}
            modalCallback={this.handleModal}
          />
          <ForYouScreen
            tabLabel={{ label: 'FOR YOU' }}
            modalCallback={this.handleModal}
          />
          <ArtistsEventsScreen
            tabLabel={{ label: 'ARTISTS & EVENTS' }}
            modalCallback={this.handleModal}
          />
          <BlogScreen tabLabel={{ label: 'BLOG' }} />
        </ScrollableTabView>
        {// player is temporary hidden
        false && (
          <Fragment>
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
        )}
      </Fragment>
    );
  }
}
