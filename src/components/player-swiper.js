import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';

import PlayerTopPanel from './player-top-panel';
import Control from './control';
import {
  colors, components, utils, images,
} from '../global';

type Props = {
  isAuthorized: Boolean,
  showCallback: Function,
  nextCallback: Function,
  playCallback: Function,
  prevCallback: Function,
  header: Text,
};

export default ({
  isAuthorized,
  showCallback,
  nextCallback,
  playCallback,
  prevCallback,
  header,
}: Props) => (
  <Container extended={isAuthorized}>
    {isAuthorized ? (
      <TextContainer>
        <PlayerTopPanel callback={showCallback} text={header} />
        <View>
          <TrackInfoContainer>
            <TrackName>The Kill</TrackName>
            <TrackArtist>30 Seconds To Mars</TrackArtist>
          </TrackInfoContainer>
          <DashboardContainer>
            <Controls>
              <Control type="skip-back" />
              <Control type="play" />
              <Control type="skip-forward" />
            </Controls>
          </DashboardContainer>
        </View>
      </TextContainer>
    ) : (
      <TouchableTextContainer>
        <Text>Connect</Text>
        <Logo source={images.logoSpotifyColorless} />
        <Text>to listen top tracks chart</Text>
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
      </TouchableTextContainer>
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

const TouchableTextContainer = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled(components.TextRegular)`
  color: ${colors.black};
`;

const Logo = styled.Image`
  width: 80;
  height: 24;
`;
