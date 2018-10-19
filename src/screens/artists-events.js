import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
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
      followed: [],
      recommended: [],
    },
    artistContent: {
      media: [],
      events: [],
    },
    displayMediaType: '',
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
    <View
      style={{
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
      }}
    >
      <Text>{data.datetime}</Text>
      <Text>{`${data.venue.city}, ${data.venue.country}`}</Text>
      <TouchableOpacity onPress={() => this.props.modalCallback(data.url)}>
        <Text style={{ color: colors.accent }}>BUY TICKETS</Text>
      </TouchableOpacity>
    </View>
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
        source={{ uri: image_url || utils.getPlaceholder(200) }}
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
            onPress={() => this.handleEnter(name)}
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
        onPress={() => this.handleEnter(name)}
      >
        <Image
          source={{ uri: image_url || utils.getPlaceholder(40) }}
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
      ...{
        content: { followed: artists, recommended: recommended.slice(0, 5) },
      },
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

  handleEnter = async (name) => {
    const { drillCallback } = this.props;
    this.setState({ loading: true });

    const artistResponse = await API.get(`artists/${name}/`);
    // console.log(artistResponse.data);
    const artistId = artistResponse.data.artist.id;
    const eventsResponse = await API.get(
      `/artists/${artistId}/events/2018-05-01/2018-10-01/`,
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
    console.log(this.state);
    this.setState({ loading: false });
  };

  showArtistMedia = () => this.setState({ showArtistMedia: true });

  showArtistEvents = () => this.setState({ showArtistMedia: false });

  getCurrentArtist = (artistName) => {
    const { content } = this.state;
    const isRecommended = content.recommended.find(
      item => item.name === artistName,
    );
    return (
      isRecommended || content.followed.find(item => item.name === artistName)
    );
  };

  render() {
    const { artist } = this.props;
    const {
      loading, content, artistContent, showArtistMedia,
    } = this.state;
    const empty = !content.followed.length && !content.recommended.length;
    return loading ? (
      <ActivityIndicator />
    ) : empty ? (
      <GetDataButton onPress={this.handleGetData}>
        <Text>get data</Text>
      </GetDataButton>
    ) : (
      <ScreenContainer>
        {artist ? (
          <View style={{ paddingTop: 25 }}>
            <View style={{ marginBottom: 25 }}>
              <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                <Image
                  style={{ width: 120, height: 120 }}
                  source={{
                    uri:
                      this.getCurrentArtist(artist).image_url
                      || utils.getPlaceholder(120),
                  }}
                />
                <View style={{ justifyContent: 'space-between' }}>
                  <Text
                    style={{ marginBottom: 10, paddingLeft: 16, fontSize: 18 }}
                  >
                    {artist}
                  </Text>
                  <TouchableOpacity onPress={() => this.handleFollow(artist)}>
                    <Text
                      style={{
                        marginBottom: 10,
                        paddingLeft: 16,
                        fontSize: 18,
                        color: colors.accent,
                      }}
                    >
                      FOLLOW
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <ArtistDisplayModeButton
                  accented={showArtistMedia}
                  onPress={this.showArtistMedia}
                >
                  <ArtistDisplayModeButtonText accented={showArtistMedia}>
                    Media
                  </ArtistDisplayModeButtonText>
                </ArtistDisplayModeButton>
                <ArtistDisplayModeButton
                  accented={!showArtistMedia}
                  onPress={this.showArtistEvents}
                >
                  <ArtistDisplayModeButtonText accented={!showArtistMedia}>
                    Events
                  </ArtistDisplayModeButtonText>
                </ArtistDisplayModeButton>
              </View>
            </View>
            {showArtistMedia && (
              <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <Text style={{ color: 'grey' }}>
                  {this.state.displayMediaType || 'All Events'}
                </Text>
              </TouchableOpacity>
            )}
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
                data={content.followed}
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

const ScreenContainer = styled.ScrollView`
  flex: 1;
  padding-horizontal: 8;
`;

const ScreenScrollContainer = styled.ScrollView``;

const GetDataButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
`;

const ArtistDisplayModeButton = styled.TouchableOpacity`
  width: 160;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  ${({ accented }) => !accented && 'border-width: 2'};
  ${({ accented }) => !accented && `border-color: ${colors.accent}`};
  ${({ accented }) => accented && `background-color: ${colors.accent}`};
`;

const ArtistDisplayModeButtonText = styled(components.TextMedium)`
  font-size: 16;
  color: ${({ accented }) => (accented ? 'white' : colors.accent)};
`;
