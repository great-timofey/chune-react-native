import React from 'react';
import styled from 'styled-components';

import { colors, components, utils } from '../global';

export default ({ callback }) => (
  <PlayerSwiper onPress={callback}>
    <PlayerSwiperText>
      Connect Spotify to listen top tracks chart
    </PlayerSwiperText>
  </PlayerSwiper>
);

const PlayerSwiper = styled.TouchableOpacity`
  width: 100%;
  height: 40;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  z-index: 1;
`;

const PlayerSwiperText = styled(components.TextRegular)`
  color: #210130;
`;
