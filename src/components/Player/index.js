import React, { Component, Fragment } from 'react';
import {
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/Feather';
import ViewOverflow from 'react-native-view-overflow';

import Control from '../Control';
import TrackCard from '../TrackCard';
import { API } from '../../services/chuneAPI';
import PlayerTopPanel from '../PlayerTopPanel';

import {
  getTracks,
  setCurrentTrack,
  setCurrentTracks,
  setCurrentTracksType,
  togglePlaying,
} from '../../redux/player/actions';
import { colors, components, utils } from '../../global';

type Props = {
  currentTrack: Object,
  playbackData: Object,
  setCurrentTrack: Function,
  togglePlaying: Function,
  loading: boolean,
  isVisible: boolean,
  callback: Function,
  topTracks: Array,
  chuneSupply: Array,
};

class Player extends Component<Props> {
  state = {
    currentSection: 0,
  };

  handleSkipForward = () => {
    /*
    const {
      topTracks,
      chuneSupply,
      currentTrack,
      setCurrentTrack,
      togglePlaying,
    } = this.props;
    // const { showTopTracks } = this.state;
    const currentTrackIndex = (showTopTracks ? topTracks : chuneSupply).indexOf(
      currentTrack,
    );
    if (
      currentTrackIndex
      === (showTopTracks ? topTracks.length : chuneSupply.length) - 1
    ) {
      setCurrentTrack(showTopTracks ? topTracks[0] : chuneSupply[0]);
      togglePlaying();
      return;
    }
    setCurrentTrack(
      showTopTracks
        ? topTracks[currentTrackIndex + 1]
        : chuneSupply[currentTrackIndex + 1],
    );
    */
  };

  handleSkipBack = () => {
    /*const {
      topTracks,
      chuneSupply,
      currentTrack,
      setCurrentTrack,
      togglePlaying,
    } = this.props;
    const { showTopTracks } = this.state;
    const currentTrackIndex = (showTopTracks ? topTracks : chuneSupply).indexOf(
      currentTrack,
    );
    // console.log(topTracks.length);
    if (currentTrackIndex === 0) {
      setCurrentTrack(showTopTracks ? topTracks[0] : chuneSupply[0]);
      // togglePlaying();
      return;
    }
    setCurrentTrack(
      showTopTracks
        ? topTracks[currentTrackIndex - 1]
        : chuneSupply[currentTrackIndex - 1],
    );*/
  };

  handleShuffle = () => {};

  handleRepeat = () => {};

  hadleSkipForward = () => {};

  renderTrack = ({ item, index }) => <TrackCard index={index} item={item} />;

  render() {
    const {
      isVisible,
      callback,
      loading,
      firstSectionTracks,
      secondSectionTracks,
      currentTrack,
      getTracks,
      playbackData,
      currentTracksType,
      setCurrentTracksType,
      togglePlaying,
    } = this.props;
    const { currentSection } = this.state;
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
            <TouchableOpacity onPress={() => this.props.getTracks()}>
              <Text>get tracks</Text>
            </TouchableOpacity>
          ) : (
            <Fragment>
              <ToggleTypeContainer>
                <ToggleTypeButton
                  onPress={() => setCurrentTracksType(0)}
                  accented={currentTracksType === 0}
                >
                  <ToggleTypeButtonText accented={currentTracksType === 0}>
                    Top Tracks
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
                <ToggleTypeButton
                  onPress={() => setCurrentTracksType(1)}
                  accented={currentTracksType === 1}
                >
                  <ToggleTypeButtonText accented={currentTracksType === 1}>
                    Chune Supply
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
              </ToggleTypeContainer>
              <FlatList
                renderItem={this.renderTrack}
                keyExtractor={item => item.id}
                data={
                  currentTracksType === 0
                    ? firstSectionTracks
                    : secondSectionTracks
                }
              />
            </Fragment>
          )}

          <DashboardContainer>
            <Cover source={{ uri: 'https://via.placeholder.com/110x110' }} />
            <Dashboard>
              <Description>
                <DescriptionName>
                  {(currentTrack && currentTrack.title) || '...'}
                </DescriptionName>
                <DescriptionArtist>
                  {(currentTrack && currentTrack.artist_name) || '......'}
                </DescriptionArtist>
              </Description>
              <ProgressBar>
                <Text>here goes progressbar</Text>
              </ProgressBar>
              <Controls>
                <Control
                  size={21}
                  type="skip-back"
                  callback={this.handleSkipBack}
                />
                <Control
                  size={21}
                  type="shuffle"
                  callback={this.handleShuffle}
                />
                <Control
                  size={21}
                  type={playbackData.playing ? 'pause' : 'play'}
                  callback={togglePlaying}
                />
                <Control size={21} type="repeat" callback={this.handleRepeat} />
                <Control
                  type="skip-forward"
                  callback={this.handleSkipForward}
                />
              </Controls>
            </Dashboard>
          </DashboardContainer>
        </ModalView>
      </ViewOverflow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getTracks,
    setCurrentTrack,
    setCurrentTracksType,
    togglePlaying,
  },
  dispatch,
);

export default connect(
  ({ player }) => ({
    playbackData: player.playbackData,
    loading: player.first.length === 0 && player.second.length === 0,
    firstSectionTracks: player.first,
    secondSectionTracks: player.second,
    currentTrack: player.currentTrack,
    currentTracksType: player.currentTracksType,
    tracksTypes: player.tracksTypes,
  }),
  mapDispatchToProps,
)(Player);

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
