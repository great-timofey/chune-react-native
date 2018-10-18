import { Platform, Text } from 'react-native';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TabBar from 'react-native-underline-tabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Player from './Player';
import colors from '../global/colors';
import HomeScreen from '../screens/home';
import BlogScreen from '../screens/blog';
import PlayerSwiper from './PlayerSwiper';
import ForYouScreen from '../screens/for-you';
import { headerLeft } from '../global/navigations';
import { toggleDrill } from '../redux/common/actions';
import ArtistsEventsScreen from '../screens/artists-events';

type Props = {
  navigation: Object,
  toggleDrill: Function,
  isDrilled: boolean,
};

class TabView extends Component<Props> {
  static navigationOptions = ({ navigation: { state } }) => {
    const name = state && state.params && state.params.iconName;
    const callback = state && state.params && state.params.handleDrill;
    return { headerLeft: () => headerLeft(name, callback) };
  };

  state = {
    url: '',
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

  handleDrill = () => {
    const { navigation, isDrilled, toggleDrill } = this.props;
    const iconName = isDrilled ? '' : 'arrow-back';
    navigation.setParams({
      iconName,
      key: 'Home',
    });
    toggleDrill();
  };

  render() {
    const { isDrilled } = this.props;
    const { isPlayerOpen } = this.state;
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
            drillCallback={this.handleDrill}
            showOneArtist={isDrilled}
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

export default connect(
  ({ common }) => ({ isDrilled: common.isDrilled }),
  { toggleDrill },
)(TabView);
