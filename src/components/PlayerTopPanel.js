import React from 'react';

import styled from 'styled-components';

import { colors, components, utils } from '~global';

type Props = {
  text: string,
  callback: Function,
};

export default ({ callback, text }: Props) => (
  <TopPanelContainer>
    <TopPanelButtonContainer onPress={callback}>
      <TopPanelButton />
      {text && <Header>{text}</Header>}
    </TopPanelButtonContainer>
  </TopPanelContainer>
);

const TopPanelContainer = styled.View`
  height: 20;
  padding-top: 3;
  align-items: center;
  width: ${utils.deviceWidth};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const TopPanelButtonContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
`;

const TopPanelButton = styled.View`
  width: 60;
  height: 3;
  background-color: #bdbdbd;
`;

const Header = styled(components.TextBold)`
  font-size: 10;
  padding-top: 3;
  color: #bdbdbd;
  text-transform: uppercase;
`;
