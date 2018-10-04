import React, { Fragment } from 'react';
import styled from 'styled-components';

import { colors, components, utils } from '../global';

export default ({ callback, text }) => (
  <TopPanelContainer>
    <TopPanelButtonContainer onPress={callback}>
      <TopPanelButton />
      {text && <Header>{text}</Header>}
    </TopPanelButtonContainer>
  </TopPanelContainer>
);

const TopPanelContainer = styled.View`
  width: ${utils.deviceWidth};
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

const Header = styled(components.TextRegular)`
  font-size: 10;
  color: ${colors.greyPrompts};
`;
