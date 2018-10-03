import React, { PureComponent } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import ViewOverflow from 'react-native-view-overflow';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../global';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default ({
  isVisible, topTracks, chuneSupply, callback,
}) => {
  const TrackContainer = styled.TouchableOpacity`
    width: ${deviceWidth};
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

  const renderTrack = ({
    item: { artist_name, title, duration_ms },
    index,
  }) => (
    <TrackContainer key={duration_ms}>
      <TrackNumberContainer>
        {index === 0 ? (
          <Icon.Button
            name="play"
            size={16}
            backgroundColor="transparent"
            color="black"
            iconStyle={{
              width: 16,
              height: 16,
              marginLeft: -8,
            }}
            borderRadius={0}
            onPress={() => alert('play')}
          />
        ) : (
          <TrackText>{0}</TrackText>
        )}
      </TrackNumberContainer>
      <TrackDescriptionContainer>
        <TrackText numberOfLines={1} ellipsizeMode="tail" accented>
          {title}
        </TrackText>
        <TrackText numberOfLines={1} ellipsizeMode="tail">
          {artist_name}
        </TrackText>
      </TrackDescriptionContainer>
      <TrackPayloadInfoContainer>
        {index === 0 ? (
          <TrackText>Now playing</TrackText>
        ) : (
          <TrackText>{moment(duration_ms).format('mm:ss')}</TrackText>
        )}
      </TrackPayloadInfoContainer>
    </TrackContainer>
  );

  return (
    <ViewOverflow>
      <ModalView
        onSwipe={callback}
        swipeThreshold={100}
        swipeDirection="down"
        isVisible={isVisible}
      >
        <TopPanelContainer>
          <TopPanelButtonContainer onPress={callback}>
            <TopPanelButton />
          </TopPanelButtonContainer>
        </TopPanelContainer>
        <ToggleTypeContainer>
          <ToggleTypeButton accented>
            <ToggleTypeButtonText accented>Top Tracks</ToggleTypeButtonText>
          </ToggleTypeButton>
          <ToggleTypeButton>
            <ToggleTypeButtonText>Chune Supply</ToggleTypeButtonText>
          </ToggleTypeButton>
        </ToggleTypeContainer>
        <FlatList
          data={topTracks}
          renderItem={renderTrack}
          keyExtractor={item => item.id}
        />
      </ModalView>
    </ViewOverflow>
  );
};

const ModalView = styled(Modal)`
  flex: 1;
  height: 100%;
  background-color: white;
  position: absolute;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  width: ${deviceWidth};
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

const TopPanelContainer = styled.View`
  width: ${deviceWidth};
  padding-top: 3;
  height: 20;
  align-items: center;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const TopPanelButtonContainer = styled.TouchableOpacity``;

const TopPanelButton = styled.View`
  width: 60;
  height: 3;
  background-color: #bdbdbd;
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

const SampleOneLinedText = <Text />;

const TextRobotoRegular = styled.Text`
  font-family: Roboto-Regular;
`;

const TextRobotoMedium = styled.Text`
  font-family: Roboto-Medium;
`;

const ToggleTypeButtonText = styled(TextRobotoMedium)`
  text-transform: uppercase;
  color: ${props => (props.accented ? '#3E224B' : colors.grey)};
`;

const TrackText = styled(TextRobotoRegular)`
  ${props => props.accented && 'margin-bottom: 3'};
  color: ${props => (props.accented ? colors.black : colors.greyPrompts)};
`;
