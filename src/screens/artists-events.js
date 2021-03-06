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
import RecommendedArtistCard from '../components/RecommendedArtistCard';
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
    mediaTypes: ['All Media', 'Articles', 'Social', 'Videos', 'Tracks'],
    displayMediaType: 'All Media',
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

  renderRecommendedCard = ({
    item: {
      image_url, name, genres, enterCallback, followCallback,
    },
  }) => (
    <RecommendedArtistCard
      name={name}
      genre={(genres[0] && genres[0].description) || 'none'}
      imageUrl={image_url}
      followCallback={this.handleFollow}
      enterCallback={this.handleEnter}
    />
  );

  calculateArtistIfFollowed = () => {
    const {
      currentArtist: { name },
      overallContent: { followed },
    } = this.props;
    return followed.find(item => item.name === name);
  };

  renderFollowedCard = ({ item: { image_url, name, genres }, index }) => (
    <FollowedArtistCard
      genre={(genres[0] && genres[0].description) || 'none'}
      name={name}
      imageUrl={image_url}
      enterCallback={this.handleEnter}
      unfollowCallback={this.handleUnfollow}
    />
  );

  handleUnfollow = (name) => {
    const { requestArtistUnfollow, currentArtist } = this.props;
    requestArtistUnfollow(name || currentArtist.name);
  };

  handleFollow = (name) => {
    const { requestArtistFollow, currentArtist } = this.props;
    requestArtistFollow(name || currentArtist.name);
  };

  handleEnter = (name) => {
    const { getDataArtistsEventsSingle, drillCallback } = this.props;
    getDataArtistsEventsSingle(name);
    drillCallback();
  };

  handleMediaDisplayedType = () => {};

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
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      );
    }
    if (currentArtist) {
      const isFollowed = this.calculateArtistIfFollowed();
      return (
        <ScreenScrollContainer showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: 25, paddingHorizontal: 8 }}>
            <View style={{ marginBottom: 15, paddingHorizontal: 8 }}>
              <View
                style={{
                  marginBottom: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: currentArtist.image_url || utils.getPlaceholder(120),
                  }}
                />
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color: 'black',
                      marginBottom: 10,
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Medium',
                    }}
                  >
                    {currentArtist.name.toUpperCase()}
                  </Text>
                  <TouchableOpacity
                    style={[
                      {
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor: colors.accent,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 5,
                      },
                      isFollowed && {
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                      },
                    ]}
                    onPress={() => (isFollowed ? this.handleUnfollow() : this.handleFollow())
                    }
                  >
                    <Text
                      style={[
                        {
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                          fontFamily: 'Roboto-Medium',
                        },
                        isFollowed && {
                          color: colors.accent,
                          fontWeight: 'normal',
                        },
                      ]}
                    >
                      {isFollowed ? 'UNFOLLOW' : 'FOLLOW'}
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
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginBottom: 5 }}
                onPress={this.handleMediaDisplayedType}
              >
                <Text style={{ color: 'grey' }}>{displayMediaType}</Text>
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
              keyExtractor={item => (item.id && `${item.id}`) || item.youtube_id || item.embed_url
              }
              showsVerticalScrollIndicator={false}
            />
            {artistContent.events.length === 0
              && !showArtistMedia && (
                <View>
                  <Text>This artist has no events for chosen period</Text>
                </View>
            )}
          </View>
        </ScreenScrollContainer>
      );
    }
    if (
      overallContent.recommended.length === 0
      && overallContent.followed.length === 0
    ) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>
            You have no currently followed or recommended artists. Use 'Search'
            menu below
          </Text>
        </View>
      );
    }
    return (
      <ScreenScrollContainer showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 24, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              paddingLeft: 16,
              marginBottom: 10,
              fontFamily: 'Roboto-Regular',
            }}
          >
            Recommended Artists
          </Text>
          <FlatList
            horizontal
            data={overallContent.recommended}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderRecommendedCard}
            keyExtractor={item => (item.id && `${item.id}`) || item.youtube_id || item.embed_url
            }
          />
        </View>
        <View
          style={{ paddingHorizontal: 8, alignItems: 'center', fontSize: 16 }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              marginBottom: 10,
              fontFamily: 'Roboto-Regular',
            }}
          >
            Currently Followed Artists
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          data={overallContent.followed}
          renderItem={this.renderFollowedCard}
          keyExtractor={item => (item.id && `${item.id}`) || item.youtube_id || item.embed_url
          }
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
