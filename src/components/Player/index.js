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

import { API } from 'services/chuneAPI';
// import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Feather';
import ViewOverflow from 'react-native-view-overflow';

import Control from 'components/Control';
import TrackCard from 'components/TrackCard';
import PlayerTopPanel from 'components/PlayerTopPanel';

import {
  getTracks,
  setCurrentTrack,
  togglePlaying,
} from '~redux/player/actions';
import { colors, components, utils } from '~global';

type Props = {
  currentTrack: Object,
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
    showTopTracks: true,
    isPlaying: true,
  };

  showTopTracks = () => this.setState({ showTopTracks: true });

  showChuneSupply = () => this.setState({ showTopTracks: false });

  handleSkipBack = () => {};

  handleShuffle = () => {};

  handlePlay = () => {
    this.props.togglePlaying();
    this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));
  };

  handleRepeat = () => {};

  hadleSkipForward = () => {};

  // calculateIfPlaying = (index) => {
  // const { currentTrack, topTracks, chuneSupply } = this.props;
  // const { showTopTracks } = this.state;
  // if (currentTrack) {
  // return (
  // currentTrack.id
  //= == (showTopTracks ? topTracks[index].id : chuneSupply[index].id)
  // );
  // }
  // return false;
  // };

  renderTrack = ({ item, index }) => {
    const { currentTrack } = this.props;
    const { setCurrentTrack } = this.props;
    return <TrackCard index={index} item={item} callback={setCurrentTrack} />;
  };

  render() {
    const {
      isVisible,
      callback,
      loading,
      topTracks,
      chuneSupply,
      currentTrack,
      getTracks,
    } = this.props;
    const { showTopTracks, isPlaying } = this.state;
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
                  onPress={this.showTopTracks}
                  accented={showTopTracks}
                >
                  <ToggleTypeButtonText accented={showTopTracks}>
                    Top Tracks
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
                <ToggleTypeButton
                  onPress={this.showChuneSupply}
                  accented={!showTopTracks}
                >
                  <ToggleTypeButtonText accented={!showTopTracks}>
                    Chune Supply
                  </ToggleTypeButtonText>
                </ToggleTypeButton>
              </ToggleTypeContainer>
              <FlatList
                renderItem={this.renderTrack}
                keyExtractor={item => item.id}
                data={showTopTracks ? topTracks : chuneSupply}
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
                {isPlaying ? (
                  <Control size={21} type="play" callback={this.handlePlay} />
                ) : (
                  <Control size={21} type="pause" callback={this.handlePlay} />
                )}
                <Control size={21} type="repeat" callback={this.handleRepeat} />
                <Control type="skip-forward" callback={this.hadleSkipForward} />
              </Controls>
            </Dashboard>
          </DashboardContainer>
        </ModalView>
      </ViewOverflow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getTracks, setCurrentTrack, togglePlaying }, dispatch);

export default connect(
  ({ player }) => ({
    loading: player.topTracks.length === 0,
    topTracks: player.topTracks,
    chuneSupply: player.chuneSupply,
    currentTrack: player.currentTrack,
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
