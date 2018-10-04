import React, { Component, Fragment } from 'react';
import {
  Text, FlatList, Platform, ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import ViewOverflow from 'react-native-view-overflow';

import Control from './control';
import PlayerTopPanel from './player-top-panel';

import { API } from '../services/chune-api';
import { colors, components, utils } from '../global';

type Props = {
  isVisible: Boolean,
  callback: Function,
};

export default class Player extends Component<Props> {
  state = {
    showTopTracks: true,
    loading: true,
    topTracks: [],
    chuneSupply: [],
  };

  componentDidMount() {
    API.get('tracks/sources/1/')
      .then(res => this.setState({ topTracks: res.data }))
      .then(_ => API.get('tracks/sources/2/'))
      .then(res => this.setState({ chuneSupply: res.data }))
      .then(res => this.setState({ loading: false }))
      .catch(err => console.log(err.response));
  }

  _renderTrack = ({ item: { artist_name, title, duration_ms }, index }) => (
    <TrackContainer>
      <TrackNumberContainer>
        {index === 0 ? (
          <Icon.Button
            name="play"
            size={16}
            backgroundColor="transparent"
            color="black"
            iconStyle={{
              width: 16,
              height: 16,
              marginLeft: -8,
            }}
            borderRadius={0}
            onPress={() => alert('play')}
          />
        ) : (
          <TrackText>{0}</TrackText>
        )}
      </TrackNumberContainer>
      <TrackDescriptionContainer>
        <TrackText numberOfLines={1} ellipsizeMode="tail" accented>
          {title}
        </TrackText>
        <TrackText numberOfLines={1} ellipsizeMode="tail">
          {artist_name}
        </TrackText>
      </TrackDescriptionContainer>
      <TrackPayloadInfoContainer>
        {index === 0 ? (
          <TrackText>Now playing</TrackText>
        ) : (
          <TrackText>{moment(duration_ms).format('mm:ss')}</TrackText>
        )}
      </TrackPayloadInfoContainer>
    </TrackContainer>
  );

  _showTopTracks = () => this.setState({ showTopTracks: true });

  _showChuneSupply = () => this.setState({ showTopTracks: false });

  _handleSkipBack = () => {};

  _handleShuffle = () => {};

  _handlePlay = () => {};

  _handleRepeat = () => {};

  _hadleSkipForward = () => {};

  render() {
    const { isVisible, callback } = this.props;
    const {
      chuneSupply, topTracks, showTopTracks, loading,
    } = this.state;
    return (
      <ViewOverflow>
        <ModalView
          onSwipe={callback}
          swipeThreshold={100}
          swipeDirection="down"
          isVisible={isVisible}
        >
          <PlayerTopPanel callback={callback} />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Fragment>
              <ToggleTypeContainer>
                <ToggleTypeButton
                  onPress={this._showTopTracks}
                  accented={showTopTracks}
                >
                  <ToggleTypeButtonText accented={showTopTracks}>
                    Top Tracks
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
                <ToggleTypeButton
                  onPress={this._showChuneSupply}
                  accented={!showTopTracks}
                >
                  <ToggleTypeButtonText accented={!showTopTracks}>
                    Chune Supply
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
              </ToggleTypeContainer>
              <FlatList
                data={showTopTracks ? topTracks : chuneSupply}
                renderItem={this._renderTrack}
                keyExtractor={item => item.id}
              />
            </Fragment>
          )}
          <DashboardContainer>
            <Cover source={{ uri: 'https://via.placeholder.com/110x110' }} />
            <Dashboard>
              <Description>
                <DescriptionName>The Kill</DescriptionName>
                <DescriptionArtist>30 Seconds To Mars</DescriptionArtist>
              </Description>
              <ProgressBar>
                <Text>here goes progressbar</Text>
              </ProgressBar>
              <Controls>
                <Control type="skip-back" callback={this._handleSkipBack} />
                <Control type="shuffle" callback={this._handleShuffle} />
                <Control type="play" callback={this._handlePlay} />
                <Control type="repeat" callback={this._handleRepeat} />
                <Control
                  type="skip-forward"
                  callback={this._hadleSkipForward}
                />
              </Controls>
            </Dashboard>
          </DashboardContainer>
        </ModalView>
      </ViewOverflow>
    );
  }
}

const ModalView = styled(Modal)`
  flex: 1;
  height: 100%;
  position: absolute;
  padding-bottom: 30;
  background-color: white;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  width: ${utils.deviceWidth};
  justify-content: space-between;
  ${Platform.select({
    android: {
      top: -10,
      left: -18,
    },
    ios: {
      top: 10,
      left: -19,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  })};
`;

const ToggleTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15;
  width: 260;
  height: 30;
`;

const ToggleTypeButton = styled.TouchableOpacity`
  width: 110;
  align-items: center;
  justify-content: center;
  border-bottom-color: ${colors.accent};
  ${props => props.accented && 'border-bottom-width: 2;'};
`;

const ToggleTypeButtonText = styled(components.TextMedium)`
  text-transform: uppercase;
  color: ${props => (props.accented ? '#3E224B' : colors.grey)};
`;

const TrackText = styled(components.TextRegular)`
  ${props => props.accented && 'margin-bottom: 3'};
  color: ${props => (props.accented ? colors.black : colors.greyPrompts)};
`;

const TrackContainer = styled.TouchableOpacity`
  width: ${utils.deviceWidth};
  height: 45;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8;
  padding-left: 10;
  padding-right: 16;
`;

const TrackNumberContainer = styled.View`
  flex: ${15 / 180};
`;

const TrackDescriptionContainer = styled.View`
  flex: ${110 / 180};
`;

const TrackPayloadInfoContainer = styled.View`
  align-items: flex-end;
  flex: ${55 / 180};
`;

const DashboardContainer = styled.View`
  height: 110;
  width: 100%;
  flex-direction: row;
  background-color: ${colors.darkViolet};
  margin-bottom: -1;
`;

const Cover = styled.Image`
  width: 110;
  height: 110;
`;

const Dashboard = styled.View`
  padding-top: 8;
  padding-horizontal: 12;
  padding-bottom: 10;
  width: ${utils.deviceWidth - 110};
`;

const Description = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
`;

const DescriptionName = styled(components.TextRegular)`
  color: white;
  font-size: 16;
`;

const DescriptionArtist = styled(components.TextRegular)`
  font-size: 13;
  color: ${colors.paleViolet};
`;

const ProgressBar = styled.View`
  flex: 1;
  justify-content: center;
`;

const Controls = styled.View`
  flex: 1;
  flex-direction: row;
  margin-horizontal: -5;
  justify-content: space-between;
`;
