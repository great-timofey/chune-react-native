import { Platform, Text, View } from 'react-native';
import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Player from './Player';
import colors from '../global/colors';
import SearchModal from './SearchModal';
import HomeScreen from '../screens/home';
import BlogScreen from '../screens/blog';
import PlayerSwiper from './PlayerSwiper';
import { height } from '../global/device';
import ForYouScreen from '../screens/for-you';
import { headerLeft } from '../global/navigations';
import ArtistsEventsScreen from '../screens/artists-events';
import {
  toggleDrill,
  toggleSearch,
  tabNavigate,
} from '../redux/common/actions';

type Props = {
  navigation: Object,
  toggleDrill: Function,
  isDrilled: boolean,
};

class TabView extends Component<Props> {
  static navigationOptions = ({ navigation: { state } }) => {
    const name = state && state.params && state.params.iconName;
    const callback = state && state.params && state.params.handleDrill;
    return {
      headerLeft: () => headerLeft(name, callback),
    };
  };

  state = {
    url: '',
    currentArtist: '',
    isPlayerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleDrill: this.handleDrill });
  }

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

  handleDrill = (artist) => {
    const {
      navigation,
      isDrilled,
      toggleDrill,
      tabNavigate,
      activeTabIndex,
    } = this.props;
    this.setState({ currentArtist: artist || '' });
    const iconName = isDrilled ? '' : 'arrow-back';
    navigation.setParams({
      iconName,
      key: 'Home',
    });
    if (activeTabIndex !== 2) {
      tabNavigate(2);
    }
    toggleDrill();
  };

  handleChangeTab = ({ i }) => this.props.tabNavigate(i);

  render() {
    const { isPlayerOpen, currentArtist } = this.state;
    const {
      isDrilled,
      isSearchOpen,
      toggleSearch,
      activeTabIndex,
    } = this.props;
    return (
      <Fragment>
        <ScrollableTabView
          page={activeTabIndex}
          onChangeTab={this.handleChangeTab}
          renderTabBar={this.renderTab}
        >
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
            drillCallback={this.handleDrill}
            artist={currentArtist || false}
          />
          <BlogScreen tabLabel={{ label: 'BLOG' }} />
        </ScrollableTabView>
        <SearchModal
          drillCallback={this.handleDrill}
          isVisible={isSearchOpen}
          showCallback={toggleSearch}
        />
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

export default connect(
  ({ common }) => ({
    isDrilled: common.isDrilled,
    isSearchOpen: common.isSearchOpen,
    activeTabIndex: common.activeTabIndex,
  }),
  { toggleDrill, toggleSearch, tabNavigate },
)(TabView);
