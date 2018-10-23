import React from 'react';
import { Text, WebView, View } from 'react-native';

import moment from 'moment';
import styled from 'styled-components';
import IOSYoutubeView from 'react-native-youtube';
import AndroidYoutubeView from 'react-native-android-fullscreen-webview-video';

import { isIOS } from '../global/device';
import { colors, components, utils } from '../global';

const VideoCard = ({
  youtubeId, description, publishedOn, channelName,
}) => (
  <VideoContainer>
    <View
      style={{
        paddingTop: 5,
        paddingHorizontal: 5,
        marginBottom: 5,
        flexDirection: 'row',
      }}
    >
      <VideoHeader
        style={{ maxWidth: '65%' }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {channelName}
      </VideoHeader>
      <VideoHeader style={{ marginLeft: 5 }}>{publishedOn}</VideoHeader>
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
    {isIOS ? (
      <IOSYoutubeView
        apiKey="AIzaSyBOhLIl3V_MIUbj3eswBbl8Zrru2JNaf4s"
        videoId={youtubeId}
        play={false}
        fullscreen
        style={{ alignSelf: 'stretch', height: 150 }}
      />
    ) : (
      <AndroidYoutubeView
        style={{ width: '100%', height: '100%' }}
        javaScriptEnabled
        domStorageEnabled
        source={{ uri: `https://www.youtube.com/embed/${youtubeId}` }}
      />
    )}
  </VideoContainer>
);

export default VideoCard;

const Container = styled.View`
  width: 100%;
  height: 100;
  border-radius: 5;
  margin-bottom: 12;
  flex-direction: column;
  background-color: white;
`;

const VideoContainer = styled(Container)`
  flex-direction: column;
  height: ${isIOS ? 'auto' : 250};
`;

const Header = styled(components.TextRegular)`
  font-size: 16;
  margin-bottom: 3;
  color: ${colors.black};
`;

const VideoHeader = styled(Header)`
  font-weight: bold;
`;
