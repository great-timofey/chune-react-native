import React, { PureComponent } from 'react';
import {
  View, Text, Image, FlatList, ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import PlayerView from '../components/player-view';
import PlayerSwiper from '../components/player-swiper';
import { MainCard, ListCard } from '../components/home';

import * as counter from '../ducks/counter';
import { colors, components, utils } from '../global';
import { API, setUserToken } from '../services/chune-api';

export default class HomeScreen extends PureComponent {
  state = {
    content: {
      featured: [],
      contentFeed: [],
    },
    loading: true,
    isPlayerOpen: false,
  };

  componentDidMount() {
    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    // API.post('users/', user)
    API.post('users/login', user)
      .then(res => res.data.token)
      .then(token => setUserToken(token))
      .then(_ => API.get('content/?filter=recent&start=0&max_results=30'))
      .then(res => res.data)
      .then(({ featured, content_feed: contentFeed }) => this.setState(state => ({
        ...state,
        ...{ content: { featured, contentFeed } },
      })))
      .then(_ => console.log(this.state))
      .then(res => this.setState({ loading: false }))
      .catch(err => alert(err));
    // Spotify.getMe().then((_) => {
    // Spotify.playURI('spotify:track:7kQiiHm3jvdz2npYMW7wcE', 0, 0);
  }

  _renderCard = ({ item: { ...data } }) => <ListCard {...data} />;

  _togglePlayer = () => this.setState(({ isPlayerOpen }) => ({
    isPlayerOpen: !isPlayerOpen,
  }));

  render() {
    const { isPlayerOpen, loading, content } = this.state;
    return loading ? (
      <ActivityIndicator />
    ) : (
      <ScreenContainer>
        <ScreenScrollContainer>
          <MainCard main data={content.featured[0]} />
          <View
            style={{
              //  other cards container
              paddingHorizontal: 8,
              paddingTop: 8,
            }}
          >
            <View
              style={{
                //  first two other cards container
                width: '100%',
                height: utils.deviceHeight * 0.295,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 8,
              }}
            >
              <MainCard data={content.featured[1]} />
              <MainCard data={content.featured[2]} />
            </View>
            <FlatList
              data={content.contentFeed}
              renderItem={this._renderCard}
              keyExtractor={item => item.id}
            />
          </View>
        </ScreenScrollContainer>
        <PlayerSwiper
          isAuthorized={!1}
          header="Top Tracks Chart"
          showCallback={this._togglePlayer}
          prevCallback={() => alert('prev')}
          playCallback={() => alert('play')}
          nextCallback={() => alert('next')}
        />
        <PlayerView isVisible={isPlayerOpen} callback={this._togglePlayer} />
      </ScreenContainer>
    );
  }
}

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
