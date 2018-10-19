import React, { Component } from 'react';
import {
  TouchableOpacity,
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListCard } from '../components/home';

import { API, setAuthToken } from '../services/chuneAPI';

import {
  colors, components, utils, constants,
} from '../global';

type Props = {
  navigation: Object,
  showOneArtist: boolean,
  drillCallback: Function,
  token: string,
};

class ArtistsEventsScreen extends Component<Props> {
  state = {
    content: {
      artists: [],
      recommended: [],
    },
    artistContent: {
      media: [],
      events: [],
    },
    currentArtist: '',
    showArtistMedia: true,
    loading: false,
  };

  componentDidMount() {
    const { token } = this.props;
    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    if (token) {
      setAuthToken(token);
    } else {
      API.post('users/login', user)
        .then(res => res.data.token)
        .then(tok => setAuthToken(tok));
    }
  }

  renderArtistMedia = ({ item: { ...data } }) => (
    <ListCard {...data} callback={this.props.modalCallback} />
  );

  renderArtistEvents = ({ item: { ...data } }) => (
    <Text>{data.description}</Text>
  );

  renderRecommendedCard = ({ item: { image_url, name, genres } }) => (
    <View
      style={{
        width: 200,
        height: 200,
        marginHorizontal: 8,
      }}
    >
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
        resizeMode="cover"
        source={{ uri: image_url || constants.NO_IMAGE_ARTIST_RECOMMENDED }}
      >
        <View>
          <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
          <Text style={{ color: 'white', fontSize: 13 }}>
            {genres.map(item => item.description).join(',')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title="ABOUT"
            color="white"
            onPress={() => this.handleAbout(name)}
          />
          <Button
            title="FOLLOW"
            color="white"
            onPress={() => this.handleFollow(name)}
          />
        </View>
      </ImageBackground>
    </View>
  );

  renderFollowedCard = ({ item: { image_url, name } }) => {
    const { drillCallback } = this.props;
    return (
      <TouchableOpacity
        style={{ width: '100%', height: 50, justifyContent: 'center' }}
        onPress={() => drillCallback(name)}
      >
        <Image
          source={{ uri: image_url || constants.NO_IMAGE_ARTIST_FOLLOWED }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  };

  handleGetData = async () => {
    this.setState({ loading: true });
    const response = await API.get('artists/');
    const {
      data: { artists, recommended },
    } = response;
    this.setState(state => ({
      ...state,
      ...{ content: { artists, recommended: recommended.slice(0, 5) } },
    }));
    this.setState({ loading: false });
  };

  handleFollow = async (name) => {
    const response = await API.post(`artists/${name}/`);
    if (response.status === 200) {
      alert('Artist has been successfully added to Followed');
    } else {
      alert('Error');
    }
  };

  handleAbout = async (name) => {
    const { drillCallback } = this.props;
    this.setState({ loading: true });

    const artistResponse = await API.get(`artists/${name}/`);
    const artistId = artistResponse.data.artist.id;
    const eventsResponse = await API.get(
      `/artists/${artistId}/events/2018-09-01/2018-10-01/`,
    );
    if (artistResponse.status === 200 && eventsResponse.status === 200) {
      const {
        data: { content: media },
      } = artistResponse;

      const { data } = eventsResponse;
      const events = data.data.length ? data.data : [];

      this.setState(state => ({
        ...state,
        ...{ artistContent: { media, events } },
      }));

      drillCallback(name);
    } else {
      alert('Error');
    }
    this.setState({ loading: false });
  };

  toggleShowArtistMediaOrEvents = () => this.setState(({ showArtistMedia }) => ({
    showArtistMedia: !showArtistMedia,
  }));

  render() {
    const { artist } = this.props;
    const {
      loading, content, artistContent, showArtistMedia,
    } = this.state;
    const empty = !content.artists.length && !content.recommended.length;
    return loading ? (
      <ActivityIndicator />
    ) : empty ? (
      <GetDataButton onPress={this.handleGetData}>
        <Text>get data</Text>
      </GetDataButton>
    ) : (
      <ScreenContainer>
        {artist ? (
          <View style={{ paddingTop: 24, marginBottom: 32 }}>
            <Text style={{ marginBottom: 10, paddingLeft: 16 }}>{artist}</Text>
            <Button
              onPress={this.toggleShowArtistMediaOrEvents}
              title="Media"
            />
            <Button
              onPress={this.toggleShowArtistMediaOrEvents}
              title="Events"
            />
            <FlatList
              data={
                showArtistMedia ? artistContent.media : artistContent.events
              }
              renderItem={
                showArtistMedia
                  ? this.renderArtistMedia
                  : this.renderArtistEvents
              }
              keyExtractor={item => `${item.id}`}
            />
          </View>
        ) : (
          <ScreenScrollContainer>
            <View style={{ paddingTop: 24, marginBottom: 32 }}>
              <Text style={{ marginBottom: 10, paddingLeft: 16 }}>
                RECOMMENDED
              </Text>
              <FlatList
                horizontal
                data={content.recommended}
                renderItem={this.renderRecommendedCard}
                keyExtractor={item => `${item.id}`}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>FOLLOWED</Text>
              <FlatList
                data={content.artists}
                renderItem={this.renderFollowedCard}
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </ScreenScrollContainer>
        )}
      </ScreenContainer>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(
  ArtistsEventsScreen,
);

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;

const GetDataButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
`;
