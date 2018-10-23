import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Text, WebView, View } from 'react-native';

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

const ListCard = ({
  url,
  type,
  title,
  image,
  callback,
  youtube_id,
  description,
  source_name,
  artist_name,
  published_on,
  channel_name,
}: Props) => {
  const getDate = rawDate => moment(rawDate)
    .format('D MMM, YYYY')
    .toUpperCase();

  const uppercaseSource = source => source.toUpperCase();

  switch (type) {
    case 'tweet':
      return (
        <Container>
          <Text>Tweet</Text>
        </Container>
      );
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
              <MetadataText>{getDate(published_on)}</MetadataText>
              <MetadataText>{artist_name}</MetadataText>
            </Metadata>
          </TextContainer>
        </TouchableContainer>
      );
    case 'video':
      return (
        <VideoContainer>
          <View
            style={{
              paddingTop: 5,
              paddingHorizontal: 5,
              marginBottom: 5,
              flexDirection: 'row',
            }}
          >
            <VideoHeader numberOfLines={1} ellipsizeMode="tail">
              {uppercaseSource(`via ${channel_name}`)}
            </VideoHeader>
            <VideoHeader
              numberOfLines={1}
              style={{ marginLeft: 10 }}
              ellipsizeMode="tail"
            >
              {getDate(published_on)}
            </VideoHeader>
          </View>
          <VideoHeader
            style={{
              paddingHorizontal: 5,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </VideoHeader>
          <YouTube
            videoId={youtube_id}
            play={false}
            fullscreen
            style={{ alignSelf: 'stretch', height: 150 }}
          />
        </VideoContainer>
      );
    default:
      return <Text>{type}</Text>;
  }
};

export default ListCard;

const Container = styled.View`
  width: 100%;
  height: 100;
  border-radius: 5;
  margin-bottom: 12;
  flex-direction: column;
  background-color: white;
`;

const VideoContainer = styled(Container)`
  height: auto;
  flex-direction: column;
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

const VideoHeader = styled(Header)`
  font-weight: bold;
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
