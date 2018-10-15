import React from 'react';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/Octicons';

import {
  colors, components, utils, images,
} from '~global';
import Control from '~components/Control';
import PlayerTopPanel from './PlayerTopPanel';

type Props = {
  header: string,
  isAuthorized: boolean,
  showCallback: Function,
  nextCallback: Function,
  playCallback: Function,
  prevCallback: Function,
};

export default ({
  header,
  isAuthorized,
  showCallback,
  nextCallback,
  playCallback,
  prevCallback,
}: Props) => (
  <Container extended={isAuthorized}>
    {isAuthorized ? (
      <Content>
        <PlayerTopPanel callback={showCallback} text={header} />
        <PlayerDataContainer>
          <TrackInfoContainer>
            <TrackName>The Kill</TrackName>
            <TrackArtist>30 Seconds To Mars</TrackArtist>
          </TrackInfoContainer>
          <Controls>
            <Control callback={prevCallback} color="#1D012A" type="skip-back" />
            <Control callback={playCallback} color="#1D012A" type="play" />
            <Control
              callback={nextCallback}
              color="#1D012A"
              type="skip-forward"
            />
          </Controls>
        </PlayerDataContainer>
      </Content>
    ) : (
      <TouchableContent onPress={showCallback}>
        <Invite>Connect</Invite>
        <Logo source={images.logoSpotifyColorless} />
        <Invite>to listen top tracks chart</Invite>
        <Icon
          style={{
            marginLeft: 10,
            marginRight: 0,
            width: 24,
            height: 24,
          }}
          size={24}
          color={colors.black}
          name="chevron-right"
          backgroundColor="transparent"
        />
      </TouchableContent>
    )}
  </Container>
);

const Container = styled.View`
  z-index: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  height: ${props => (props.extended ? '70' : '40')};
`;

const TouchableContent = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.View`
  width: 100%;
  padding-bottom: 8;
  align-items: center;
  padding-horizontal: 16;
  justify-content: space-between;
`;

const Invite = styled(components.TextRegular)`
  color: ${colors.black};
`;

const Logo = styled.Image`
  width: 80;
  height: 24;
`;

const PlayerDataContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TrackInfoContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

const Controls = styled.View`
  width: 33%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TrackName = styled(components.TextRegular)`
  font-size: 14;
  color: ${colors.darkViolet};
`;

const TrackArtist = styled(components.TextRegular)`
  font-size: 12;
  color: ${colors.paleViolet};
`;
