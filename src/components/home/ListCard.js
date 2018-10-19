import React from 'react';
import moment from 'moment';
import { Text } from 'react-native';
import styled from 'styled-components';

import YouTube from 'react-native-youtube';
import { colors, components, utils } from '../../global';
import { homeImagesPrefix } from '../../services/chuneAPI';

type Props = {
  title: string,
  image: string,
  sourceName: string,
  artistName: string,
  type: string,
};

export default ({
  title,
  source_name,
  published_on,
  artist_name,
  image,
  type,
  url,
  youtube_id,
  description,
  callback,
}: Props) => {
  switch (type) {
    case 'tweet':
      return <Text>Tweet</Text>;
    case 'article':
      return (
        <TouchableContainer onPress={() => callback(url)}>
          <Picture
            resizeMode="cover"
            source={{
              uri: homeImagesPrefix + image,
            }}
          />
          <TextContainer>
            <Header numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Header>
            <Description>What Makes Flyers Untivaled</Description>
            <From>dewd</From>
            <Metadata>
              <MetadataText>{source_name}</MetadataText>
              <MetadataText>
                {moment(published_on)
                  .format('D MMM')
                  .toUpperCase()}
              </MetadataText>
              <MetadataText>{artist_name}</MetadataText>
            </Metadata>
          </TextContainer>
        </TouchableContainer>
      );
    case 'video':
      return (
        <Container style={{ height: 170, flexDirection: 'column' }}>
          <Header numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Header>
          <YouTube
            videoId={youtube_id}
            play={false}
            fullscreen
            style={{ alignSelf: 'stretch', height: 150 }}
          />
        </Container>
      );
    default:
      return <Text>{type}</Text>;
  }
};

const Container = styled.View`
  width: 100%;
  height: 100;
  margin-bottom: 12;
  flex-direction: column;
  background-color: white;
`;

const TouchableContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100;
  margin-bottom: 12;
  flex-direction: row;
  background-color: white;
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
  font-size: 16;
  margin-bottom: 3;
  color: ${colors.black};
`;

const Description = styled(components.TextRegular)`
  font-size: 13;
  color: ${colors.paleViolet};
`;

const From = styled(components.TextRegular)`
  font-size: 13;
  margin-bottom: 3;
  color: ${colors.paleViolet};
`;

const Metadata = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MetadataText = styled(components.TextRegular)`
  font-size: 13;
  color: ${colors.greyPrompts};
`;
