import React, { Component, Fragment } from 'react';
import {
  Alert, Platform, Text, View, BackHandler,
} from 'react-native';

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
import { setDataArtistsEventsSingle } from '../redux/data/actions';
import { tabNavigate, toggleSearch } from '../redux/common/actions';

type Props = {
  navigation: Object,
};

class TabView extends Component<Props> {
  static navigationOptions = ({ navigation: { state } }) => {
    const name = state && state.params && state.params.iconName;
    const drawerCallback = state && state.params && state.params.handleDrawer;
    const undrillCallback = state && state.params && state.params.handleUndrill;
    return {
      headerLeft: () => headerLeft(name, undrillCallback, drawerCallback),
    };
  };

  state = {
    url: '',
    isPlayerOpen: false,
  };

   componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleUndrill: this.handleUndrill,
      handleDrawer: this.handleDrawer,
    });
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonAndroid,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButtonAndroid = () => {
    const { currentArtist, activeTabIndex } = this.props;
    if (activeTabIndex === 2 && currentArtist) {
      this.handleUndrill();
      return true;
    }
    Alert.alert('Confirm exit', 'Do you want to quit the app?', [
      { text: 'CANCEL', style: 'cancel' },
      { text: 'OK', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }; 

  handleDrawer = () => this.props.navigation.openDrawer();

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

  calculateLeftHeaderAction = (index) => {
    const { navigation, currentArtist } = this.props;
    const iconName = currentArtist && index === 2 ? 'arrow-back' : 'menu';
    navigation.setParams({
      iconName,
      key: 'Home',
    });
  };

  handleDrill = () => {
    const { navigation, activeTabIndex, tabNavigate } = this.props;
    navigation.setParams({
      iconName: 'arrow-back',
      key: 'Home',
    });
  };

  handleUndrill = () => {
    const {
      navigation,
      setDataArtistsEventsSingle,
      artistsEventsLoading,
    } = this.props;
    if (artistsEventsLoading) {
      return null;
    }
    navigation.setParams({
      iconName: 'menu',
      key: 'Home',
    });
    setDataArtistsEventsSingle(null);
  };

  handleChangeTab = ({ i: index }) => {
    const { tabNavigate } = this.props;
    this.calculateLeftHeaderAction(index);
    tabNavigate(index);
  };

  render() {
    const { isPlayerOpen } = this.state;
    const { isSearchOpen, activeTabIndex, toggleSearch } = this.props;
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
          />
          <BlogScreen tabLabel={{ label: 'BLOG' }} />
        </ScrollableTabView>
        <SearchModal
          isVisible={isSearchOpen}
          drillCallback={this.handleDrill}
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
  ({ common, data: { artistsEvents } }) => ({
    isSearchOpen: common.isSearchOpen,
    activeTabIndex: common.activeTabIndex,
    currentArtist: artistsEvents.currentArtist,
    artistsEventsLoading: artistsEvents.loading,
  }),
  {
    tabNavigate,
    toggleSearch,
    setDataArtistsEventsSingle,
  },
)(TabView);
