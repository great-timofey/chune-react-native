import React from 'react';
import styled from 'styled-components';

import { components, utils } from '~global';
import device from 'global/device';

type Props = {
  text: string,
  callback: Function,
};

const hitSlop = {
  top: 0,
  left: 0,
  bottom: 20,
  right: device.width,
};

export default ({ callback, text }: Props) => (
  <TopPanelContainer>
    <TopPanelButtonContainer onPress={callback} hitSlop={hitSlop}>
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
