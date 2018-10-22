import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import {
  colors, components, utils, constants,
} from '../global';
import { ListCard } from '../components/home';
import FollowedArtistCard from '../components/FollowedArtistCard';
import {
  requestArtistFollow,
  requestArtistUnfollow,
  getDataArtistsEventsSingle,
  getDataArtistsEventsOverall,
} from '../redux/data/actions';

type Props = {
  token: string,
  navigation: Object,
  showOneArtist: boolean,
  drillCallback: Function,
};

class ArtistsEventsScreen extends Component<Props> {
  state = {
    displayMediaType: '',
    showArtistMedia: true,
  };

  renderArtistMedia = ({ item: { ...data } }) => {
    const { modalCallback } = this.props;
    return <ListCard {...data} callback={modalCallback} />;
  };

  renderArtistEvents = ({ item: { ...data } }) => {
    const { modalCallback } = this.props;
    const {
      venue: { city, country },
    } = data;
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Text>{data.datetime}</Text>
        <Text>{`${city}, ${country}`}</Text>
        <TouchableOpacity onPress={() => modalCallback(data.url)}>
          <Text style={{ color: colors.accent }}>BUY TICKETS</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  renderFollowedCard = ({ item: { image_url, name, genres }, index }) => (
    <FollowedArtistCard
      genre={(genres[0] && genres[0].description) || 'none'}
      name={name}
      imageUrl={image_url}
      enterCallback={this.handleEnter}
      unfollowCallback={this.handleUnfollow}
    />
    /* <TouchableOpacity
      style={{
        height: 50,
        width: '100%',
        paddingLeft: 16,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
      }}
      onPress={() => this.handleEnter(name)}
    >
      <Image
        source={{ uri: image_url || utils.getplaceholder(40) }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
        }}
      />
      <Text>{name}</Text>
    </TouchableOpacity> */
  );

  handleUnfollow = (name) => {
    const { requestArtistUnfollow } = this.props;
    requestArtistUnfollow(name);
  };

  handleFollow = (name) => {
    const { requestArtistFollow } = this.props;
    requestArtistFollow(name);
  };

  handleEnter = (name) => {
    const { getDataArtistsEventsSingle, drillCallback } = this.props;
    getDataArtistsEventsSingle(name);
    drillCallback();
  };

  showArtistMedia = () => this.setState({ showArtistMedia: true });

  showArtistEvents = () => this.setState({ showArtistMedia: false });

  render() {
    const { showArtistMedia, displayMediaType } = this.state;
    const {
      loading,
      artistContent,
      currentArtist,
      overallContent,
      getDataArtistsEventsSingle,
      getDataArtistsEventsOverall,
    } = this.props;
    return loading ? (
      <ActivityIndicator />
    ) : currentArtist ? (
      <ScreenScrollContainer>
        <View style={{ paddingTop: 25, paddingHorizontal: 8 }}>
          <View style={{ marginBottom: 25, paddingHorizontal: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 25,
              }}
            >
              <Image
                style={{ width: 120, height: 120 }}
                source={{
                  uri: currentArtist.image_url || utils.getPlaceholder(120),
                }}
              />
              <View style={{ justifyContent: 'space-between' }}>
                <Text
                  style={{ marginBottom: 10, paddingLeft: 16, fontSize: 18 }}
                >
                  {currentArtist.name}
                </Text>
                <TouchableOpacity
                  onPress={() => this.handleFollow(currentArtist.name)}
                >
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
                {displayMediaType || 'All Media'}
              </Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={showArtistMedia ? artistContent.media : artistContent.events}
            renderItem={
              showArtistMedia ? this.renderArtistMedia : this.renderArtistEvents
            }
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </ScreenScrollContainer>
    ) : (
      <ScreenScrollContainer>
        <View style={{ paddingTop: 24, marginBottom: 32 }}>
          <Text style={{ marginBottom: 10, paddingLeft: 16 }}>RECOMMENDED</Text>
          <FlatList
            horizontal
            data={overallContent.recommended}
            renderItem={this.renderRecommendedCard}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <View
          style={{ paddingHorizontal: 8, alignItems: 'center', fontSize: 16 }}
        >
          <Text style={{ marginBottom: 10 }}>Currently Followed Artists</Text>
        </View>
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={overallContent.followed}
          renderItem={this.renderFollowedCard}
          keyExtractor={item => `${item.id}`}
        />
      </ScreenScrollContainer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestArtistFollow,
    requestArtistUnfollow,
    getDataArtistsEventsSingle,
    getDataArtistsEventsOverall,
  },
  dispatch,
);

export default connect(
  ({
    auth: { token },
    data: {
      artistsEvents: {
        currentArtist, overallContent, artistContent, loading,
      },
    },
  }) => ({
    token,
    loading,
    currentArtist,
    artistContent,
    overallContent,
  }),
  mapDispatchToProps,
)(ArtistsEventsScreen);

const ScreenScrollContainer = styled.ScrollView``;

const ArtistDisplayModeButton = styled.TouchableOpacity`
  width: 49%;
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
