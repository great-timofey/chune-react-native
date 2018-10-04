import React from 'react';
import styled from 'styled-components';

import { colors, components, utils } from '../../global';
import { featuredArticleUrl } from '../../services/chune-api';

export default ({ main, data: { url, title, image } }) => (
  <Container main={main}>
    <BackgroundImage
      resizeMode="cover"
      source={{
        uri: featuredArticleUrl + image,
      }}
    >
      <TextContainer main={main}>
        <Header main={main} ellipsizeMode="tail" numberOfLines={2}>
          {title}
        </Header>
        <Preview main={main}>
          Nail It On The Head With Free Internet Advertising
        </Preview>
        {main && (
          <ReadMoreButton>
            <ReadMoreButtonText>Read More</ReadMoreButtonText>
          </ReadMoreButton>
        )}
      </TextContainer>
    </BackgroundImage>
  </Container>
);

const Container = styled.View`
  ${props => props.main && `height: ${utils.deviceHeight * 0.43}`};
  width: ${props => (props.main ? '100%' : utils.deviceWidth * 0.47)};
`;

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-vertical: ${props => (props.main ? '10' : '8')};
  padding-horizontal: ${props => (props.main ? '16' : '8')};
`;

const Header = styled(components.TextRegular)`
  color: white;
  margin-bottom: 5;
  font-size: ${props => (props.main ? '24' : '16')};
`;

const Preview = styled(components.TextRegular)`
  color: white;
  font-size: ${props => (props.main ? '13' : '11')};
  ${props => props.main && 'width: 50%; margin-bottom: 15'};
`;

const ReadMoreButton = styled.TouchableOpacity`
  align-self: flex-start;
`;

const ReadMoreButtonText = styled(components.TextMedium)`
  color: white;
  text-transform: uppercase;
`;
