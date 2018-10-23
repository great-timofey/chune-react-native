import React, { PureComponent } from 'react';

import styled from 'styled-components';

import { colors, components, utils } from '../global';

class PrivacyPolicyScreen extends PureComponent {
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
        <PrivacyText>
          Protecting your private information is our priority. This Statement of
          Privacy applies to chunemusicfeed.com and Chune Music Corp and governs
          data collection and usage. For the purposes of this Privacy Policy,
          unless otherwise noted, all references to Chune Music Corp include
          chunemusicfeed.com and Chune. The Chune website is a news and
          information site. By using the Chune website, you consent to the data
          practices described in this statement.
        </PrivacyText>
        <PrivacyText>
          Collection of your Personal Information - In order to better provide
          you with products and services offered on our Site, Chune may collect
          personally identifiable information, such as your e-mail address
          and/or social Media profile (through the social media site's
          authentication API) If you purchase Chune's products and services, we
          collect billing and credit card information. This information is used
          to complete the purchase transaction. We do not collect any personal
          information about you unless you voluntarily provide it to us.
          However, you may be required to provide certain personal information
          to us when you elect to use certain products or services available on
          the Site. These may include: (a) registering for an account on our
          Site; (b) entering a sweepstakes or contest sponsored by us or one of
          our partners; (c) signing up for special offers from selected third
          parties; (d) sending us an email message; (e) submitting your credit
          card or other payment information when ordering and purchasing
          products and services on our Site. To wit, we will use your
          information for, but not limited to, communicating with you in
          relation to services and/or products you have requested from us. We
          also may gather additional personal or non-personal information in the
          future.
        </PrivacyText>
        <PrivacyText>
          Use of your Personal Information - Chune collects and uses your
          personal information to operate its website(s) and deliver the
          services you have requested. Chune may also use your personally
          identifiable information to inform you of other products or services
          available from Chune and its affiliates.
        </PrivacyText>
      </Container>
    );
  }
}

export default PrivacyPolicyScreen;

const Container = styled.ScrollView`
  padding-top: 25;
  padding-horizontal: 16;
`;

const PrivacyText = styled(components.TextRegular)`
  font-size: 14;
  line-height: 24;
  margin-bottom: 50;
  color: ${colors.black};
`;
