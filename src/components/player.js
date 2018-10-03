import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import ViewOverflow from 'react-native-view-overflow';

import { colors } from '../global';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default ({ isVisible, callback }) => {
  const toRender = (
    <ViewOverflow>
      <ModalView
        swipeThreshold={100}
        swipeDirection="down"
        onSwipe={callback}
        isVisible={isVisible}
      >
        <TopPanelContainer>
          <TopPanelButtonContainer onPress={callback}>
            <TopPanelButton />
          </TopPanelButtonContainer>
        </TopPanelContainer>
        <ToggleTypeContainer>
          <ToggleTypeButton>
            <ToggleTypeButtonText active>Top Tracks</ToggleTypeButtonText>
          </ToggleTypeButton>
          <ToggleTypeButton>
            <ToggleTypeButtonText active={false}>
              Chune Supply
            </ToggleTypeButtonText>
          </ToggleTypeButton>
        </ToggleTypeContainer>
      </ModalView>
    </ViewOverflow>
  );
  return toRender;
};

const ModalView = styled(Modal)`
  flex: 1;
  height: 100%;
  background-color: white;
  position: absolute;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  width: ${windowWidth};
  ${Platform.select({
    android: {
      top: -10,
      left: -18,
    },
    ios: {
      top: 10,
      left: -20,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  })};
`;

const TopPanelContainer = styled.View`
  width: ${windowWidth};
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
  width: 260;
  height: 30;
`;

const ToggleTypeButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const TextRobotoMedium = styled.Text`
  font-family: Roboto-Medium;
  color: ${props => (props.active ? colors.accent : colors.grey)};
`;

const ToggleTypeButtonText = styled(TextRobotoMedium)`
  text-transform: uppercase;
`;
