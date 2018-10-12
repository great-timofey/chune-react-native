import React, { PureComponent, Fragment } from 'react';
import {
  View, Text, Image, FlatList, ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import PlayerView from '../components/player-view';
import PlayerSwiper from '../components/player-swiper';
import { MainCard, ListCard } from '../components/home';

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

    const raw = '{"id":"AvzorXK","title":"Listen To Anderson .Paak & Kendrick Lamars Must Hear Smooth New Collab Tints","artist_name":"Kendrick Lamar","published_on":"2018-10-04T17:09:54Z","image":"d9ee37aabae9bf20b5a01bee48777b1ca12d5aaa.jpg","url":"http://thissongissick.com/post/anderson-paak-kendrick-lamar-tints","source_name":"This Song Is Sick","type":"article"}';

    const contentFeed = [JSON.parse(raw)];
    console.log(contentFeed);
    this.setState({ content: { contentFeed } });

    // API.post('users/', user)
    API.post('users/login', user)
      .then(res => res.data.token)
      .then(token => setUserToken(token))
      .then(_ => API.get('content/?filter=recent&start=0&max_results=10'))
      .then((res) => { console.log('DATA', res.data); return res.data; })
      // .then(({ featured, content_feed: contentFeed }) => this.setState(state => ({
      // ...state,
      // ...{ content: { featured, contentFeed } },
      // })))
      .then(_ => console.log(this.state))
      .then(res => this.setState({ loading: false }));
    // .catch(err => alert(err));
    // Spotify.getMe().then((_) => {
    // Spotify.playURI('spotify:track:7kQiiHm3jvdz2npYMW7wcE', 0, 0);
  }

  renderCard = ({ item: { ...data } }) => <ListCard {...data} />;

  togglePlayer = () => this.setState(({ isPlayerOpen }) => ({
    isPlayerOpen: !isPlayerOpen,
  }));

  render() {
    const { isPlayerOpen, loading, content } = this.state;
    return loading ? (
      <ActivityIndicator />
    ) : (
      <ScreenContainer>
        <ScreenScrollContainer>
          {false && <MainCard main data={content.featured[0]} />}
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
              {false && (
                <Fragment>
                  <MainCard data={content.featured[1]} />
                  <MainCard data={content.featured[2]} />
                </Fragment>
              )}
            </View>
            <FlatList
              data={content.contentFeed}
              renderItem={this.renderCard}
              keyExtractor={item => item.id}
            />
          </View>
        </ScreenScrollContainer>
        <PlayerSwiper
          isAuthorized={!1}
          header="Top Tracks Chart"
          showCallback={this.togglePlayer}
          prevCallback={() => alert('prev')}
          playCallback={() => alert('play')}
          nextCallback={() => alert('next')}
        />
        <PlayerView isVisible={isPlayerOpen} callback={this.togglePlayer} />
      </ScreenContainer>
    );
  }
}

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
