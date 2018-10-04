import React from 'react';
import styled from 'styled-components';

import { colors, components, utils } from '../../global';
import { homeImagesPrefix } from '../../services/chune-api';

export default ({
  title, sourceName, artistName, image,
}) => (
  <Container>
    <Picture
      resizeMode="cover"
      source={{
        uri: `${homeImagesPrefix}${image}.jpg`,
      }}
    />
    <TextContainer>
      <Header numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Header>
      <Description>What Makes Flyers Untivaled</Description>
      <From>dewd</From>
      <Metadata>
        <MetadataText>{sourceName}</MetadataText>
        <MetadataText>22 SEP</MetadataText>
        <MetadataText>{artistName}</MetadataText>
      </Metadata>
    </TextContainer>
  </Container>
);

const Container = styled.View`
  width: 100%;
  height: 100;
  background-color: red;
  flex-direction: row;
  margin-bottom: 12;
`;

const Picture = styled.Image`
  width: 100;
  height: 100;
`;

const TextContainer = styled.View`
  flex: 1;
  padding-vertical: 5;
  padding-horizontal: 12;
  background-color: white;
`;
const Header = styled(components.TextRegular)`
  color: ${colors.black};
  font-size: 16;
  margin-bottom: 3;
`;

const Description = styled(components.TextRegular)`
  color: ${colors.paleViolet};
  font-size: 13;
`;

const From = styled(components.TextRegular)`
  color: ${colors.paleViolet};
  font-size: 13;
  margin-bottom: 3;
`;

const Metadata = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MetadataText = styled(components.TextRegular)`
  color: ${colors.greyPrompts};
`;
