import React from 'react';
import styled from 'styled-components';

import { colors, components, utils } from '../global';

type Props = {
  name: string,
  imageUrl: string,
  callback: Function,
};

const FollowedArtistCard = ({
  name,
  imageUrl,
  enterCallback,
  unfollowCallback,
  genre,
}: Props) => (
  <Container>
    <Cover source={{ uri: imageUrl || utils.getPlaceholder(40) }} />
    <DescriptionContainer>
      <Genre>{genre}</Genre>
      <Name numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Name>
      <ControlsContainer>
        <MoreButton onPress={() => enterCallback(name)}>
          <ControlButtonText>MORE</ControlButtonText>
        </MoreButton>
        <UnfollowButton onPress={() => unfollowCallback(name)}>
          <ControlButtonText>UNFOLLOW</ControlButtonText>
        </UnfollowButton>
      </ControlsContainer>
    </DescriptionContainer>
  </Container>
);
export default FollowedArtistCard;

const Container = styled.View`
  height: 120;
  width: 320;
  border-width: 1;
  border-radius: 5;
  overflow: hidden;
  margin-bottom: 10;
  align-items: center;
  flex-direction: row;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.12);
`;

const Cover = styled.Image`
  width: 120;
  height: 120;
  margin-right: 20;
  border-top-left-radius: 20;
  border-bottom-left-radius: 20;
`;

const DescriptionContainer = styled.View`
  width: 180;
  height: 80%;
  justify-content: space-between;
`;

const Name = styled(components.TextRegular)`
  color: black;
  font-size: 20;
  font-weight: bold;
`;

const Genre = styled(components.TextRegular)`
  color: black;
  font-size: 12;
`;

const ControlsContainer = styled.View`
  flex-direction: row;
`;

const MoreButton = styled.TouchableOpacity`
  margin-right: 20;
`;

const UnfollowButton = styled.TouchableOpacity``;

const ControlButtonText = styled(components.TextRegular)`
  font-size: 15;
  color: ${colors.accent};
`;
