import React, { PureComponent } from 'react';

import styled from 'styled-components';

import { colors, components, utils } from '../global';

class TermsConditionsScreen extends PureComponent {
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
        <TCText>
          Agreement between User and chunemusicfeed.com - Welcome to
          chunemusicfeed.com! The chunemusicfeed.com website (the "Site") is
          comprised of various web pages operated by Chune Music Corp ("Chune").
          chunemusicfeed.com is offered to you conditioned on your acceptance
          without modification of the terms, conditions, and notices contained
          herein (the "Terms"). Your use of chunemusicfeed.com constitutes your
          agreement to all such Terms. Please read these terms carefully, and
          keep a copy of them for your reference. chunemusicfeed.com is a News
          and Information Site. The purpose of chunemusicfeed.com is to keep
          users up to date with everything that their favorite artists are
          doing. Users will also be able to purchase merchandise from the site
        </TCText>
        <TCText>
          Privacy - Your use of chunemusicfeed.com is subject to Chune's Privacy
          Policy. Please review our Privacy Policy, which also governs the Site
          and informs users of our data collection practices.
        </TCText>
        <TCText>
          Electronic Communications - Visiting chunemusicfeed.com or sending
          emails to Chune constitutes electronic communications. You consent to
          receive electronic communications and you agree that all agreements,
          notices, disclosures and other communications that we provide to you
          electronically, via email and on the Site, satisfy any legal
          requirement that such communications be in writing.
        </TCText>
      </Container>
    );
  }
}

export default TermsConditionsScreen;

const Container = styled.ScrollView`
  padding-top: 25;
  padding-horizontal: 16;
`;

const TCText = styled(components.TextRegular)`
  color: black;
  font-size: 14;
  line-height: 24;
  margin-bottom: 50;
`;
