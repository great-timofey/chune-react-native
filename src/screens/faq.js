import React, { PureComponent } from 'react';

import styled from 'styled-components';

import { colors, components, utils } from '../global';

class FAQScreen extends PureComponent {
  static navigationOptions = {
    gesturesEnabled: false,
    headerTitleStyle: { color: 'white', fontFamily: 'Roboto-Regular' },
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.accent,
      ...utils.platformSelect(
        {
          paddingTop: 20,
          marginBottom: 16,
          borderTopWidth: 21,
          borderTopColor: '#52146C',
        },
        {
          elevation: 0,
        },
      ),
    },
  };

  render() {
    return (
      <Container>
        <FAQQuestion>
          Are there going to more features when the site releases?
        </FAQQuestion>
        <FAQAnswer>
          The main feature we plan on adding for the release of the site is the
          integration of Spotify and Apple Music. When one of your favorite
          artists releases a new song or album, it will show up on your feed and
          you will be able to play that music straight from the feed.
        </FAQAnswer>
        <FAQQuestion>Which YouTube channels do you pull from?</FAQQuestion>
        <FAQAnswer>
          We’ve selected approximately 50 Youtube channels with the highest
          quality content like Complex, TheNeedleDrop, The Breakfast Club, and
          more. These are channels that artists are featured on regularly, so
          you can get all the latest relevant videos about your favorite
          artists. If you think we missed a channel, let us know!
        </FAQAnswer>
        <FAQQuestion>
          How do I get my YouTube channel featured on Chune?
        </FAQQuestion>
        <FAQAnswer>Contact us!</FAQAnswer>
      </Container>
    );
  }
}

export default FAQScreen;

const Container = styled.ScrollView`
  padding-top: 25;
  padding-horizontal: 16;
`;

const FAQQuestion = styled(components.TextMedium)`
  font-size: 20;
  margin-bottom: 10;
  color: ${colors.darkViolet};
`;

const FAQAnswer = styled(components.TextRegular)`
  font-size: 14;
  line-height: 24;
  margin-bottom: 30;
  color: ${colors.black};
`;
