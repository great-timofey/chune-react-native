import React from 'react';
import styled from 'styled-components';

import config from '../../global/config';
import { colors, components, utils } from '../../global';

type Props = {
  main: boolean,
  data: Object,
  url: string,
  title: string,
  image: string,
};

const MainCard = ({ main, data: { url, title, image }, callback }: Props) => (
  <Container main={main} onPress={() => callback(url)} activeOpacity={1}>
    <BackgroundImage
      resizeMode="cover"
      source={{
        uri: `${config.API.IMAGES.FULL}${image}`,
      }}
    >
      <TextAligner>
        <TextContainer main={main}>
          <Header main={main} ellipsizeMode="tail" numberOfLines={2}>
            {title}
          </Header>
          {main && (
            <ReadMoreButton>
              <ReadMoreButtonText>READ MORE</ReadMoreButtonText>
            </ReadMoreButton>
          )}
        </TextContainer>
      </TextAligner>
    </BackgroundImage>
  </Container>
);

export default MainCard;

const TextAligner = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  background-color: black;
  padding-vertical: ${props => (props.main ? '10' : '8')};
  padding-horizontal: ${props => (props.main ? '16' : '8')};
`;

const Container = styled.TouchableOpacity`
  ${props => props.main && `height: ${utils.deviceHeight * 0.43}`};
  width: ${props => (props.main ? '100%' : utils.deviceWidth * 0.47)};
`;

const Header = styled(components.TextRegular)`
  color: white;
  margin-bottom: 5;
  font-size: ${props => (props.main ? '24' : '16')};
`;

const ReadMoreButton = styled.TouchableOpacity`
  align-self: flex-start;
`;

const ReadMoreButtonText = styled(components.TextMedium)`
  color: white;
`;
