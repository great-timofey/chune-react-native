import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { setCurrentTrackRequest } from '~redux/player/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, components, utils } from '~global';

type Props = {
  item: Object,
  index: number,
  togglePlaying: Function,
  setCurrentTrackRequest: Function,
  currentTrack: Object,
  playbackData: Object,
};

class TrackCard extends Component<Props> {
  handlePlayTrack = () => {
    const { item } = this.props;
    this.props.setCurrentTrackRequest(item);
  };

  render() {
    const {
      item,
      index,
      setTrackCallback,
      currentTrack,
      playbackData,
    } = this.props;
    return (
      <TrackContainer onPress={this.handlePlayTrack}>
        <TrackNumberContainer>
          {currentTrack && currentTrack.id === item.id ? (
            <Icon.Button
              name={playbackData.playing ? 'pause' : 'play'}
              size={16}
              backgroundColor="transparent"
              color="black"
              iconStyle={{
                width: 16,
                height: 16,
                marginLeft: -8,
              }}
              borderRadius={0}
              onPress={this.handlePlayTrack}
            />
          ) : (
            <TrackText>{index + 1}</TrackText>
          )}
        </TrackNumberContainer>
        <TrackDescriptionContainer>
          <TrackText numberOfLines={1} ellipsizeMode="tail" accented>
            {item.title}
          </TrackText>
          <TrackText numberOfLines={1} ellipsizeMode="tail">
            {item.artist_name}
          </TrackText>
        </TrackDescriptionContainer>
        <TrackPayloadInfoContainer>
          {currentTrack && currentTrack.id === item.id ? (
            <TrackText>Now playing</TrackText>
          ) : (
            <TrackText>{moment(item.duration_ms).format('mm:ss')}</TrackText>
          )}
        </TrackPayloadInfoContainer>
      </TrackContainer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentTrackRequest }, dispatch);

export default connect(
  ({ player }) => ({
    currentTrack: player.currentTrack,
    playbackData: player.playbackData,
  }),
  mapDispatchToProps,
)(TrackCard);

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
