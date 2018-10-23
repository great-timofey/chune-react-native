import React from 'react';
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
import styled from 'styled-components';

import { colors, components, utils } from '../global';

type Props = {
  name: string,
  imageUrl: string,
  callback: Function,
};

const RecommendedArtistCard = ({
  name,
  genre,
  imageUrl,
  enterCallback,
  followCallback,
}: Props) => (
  <Container>
    <BackgroundImage
      resizeMode="cover"
      source={{ uri: imageUrl || utils.getPlaceholder(200) }}
    >
      <DescriptionContainer style={{}}>
        <Genre>{genre}</Genre>
        <Name>{name}</Name>
      </DescriptionContainer>
      <ControlsContainer>
        <Control onPress={() => enterCallback(name)}>
          <ControlText>ABOUT</ControlText>
        </Control>
        <Control onPress={() => followCallback(name)}>
          <ControlText>FOLLOW</ControlText>
        </Control>
      </ControlsContainer>
    </BackgroundImage>
  </Container>
);

export default RecommendedArtistCard;

const Container = styled.View`
  width: 200;
  height: 200;
  border-radius: 5;
  overflow: hidden;
  margin-bottom: 10;
  margin-horizontal: 8;
`;

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const DescriptionContainer = styled.View`
  margin-left: 10;
  margin-bottom: 90;
`;

const Name = styled(components.TextRegular)`
  color: white;
  font-size: 25;
  font-weight: bold;
`;

const Genre = styled(components.TextRegular)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16;
  font-weight: bold;
`;

const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 140;
  margin-left: 20;
`;

const Control = styled.TouchableOpacity``;
const ControlText = styled(components.TextRegular)`
  color: white;
  font-weight: bold;
  font-size: 17;
`;
