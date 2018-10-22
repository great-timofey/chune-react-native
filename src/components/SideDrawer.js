import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import styled from 'styled-components';
import { NavigationActions } from 'react-navigation';

import { store } from '../redux/store';
import { userLogout } from '../redux/auth/actions';
import { images, colors, components } from '../global';

class SideDrawer extends Component {
  navigateToScreen = route => () => {
    const { navigation } = this.props;
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
  };

  renderLogoutAlert = () => Alert.alert(
    'Do you really want to log out?',
    null,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => store.dispatch(userLogout({})),
      },
    ],
    { cancelable: false },
  );

  render() {
    return (
      <Container forceInset={{ top: 'always', horizontal: 'never' }}>
        <Logo source={images.logoChune} />
        <View>
          <LinkContainer>
            <LinkText onPress={this.navigateToScreen('Privacy Policy')}>
              Privacy Policy
            </LinkText>
          </LinkContainer>
          <LinkContainer>
            <LinkText onPress={this.navigateToScreen('Terms and Conditions')}>
              Terms and Conditions
            </LinkText>
          </LinkContainer>
          <LinkContainer>
            <LinkText onPress={this.navigateToScreen('FAQ')}>FAQ</LinkText>
          </LinkContainer>
        </View>
        <LogoutContainer>
          <LinkText onPress={this.renderLogoutAlert}>Logout</LinkText>
        </LogoutContainer>
      </Container>
    );
  }
}

export default SideDrawer;

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 60;
  margin-left: 15;
  margin-bottom: 80;
  justify-content: space-between;
`;

const Logo = styled.Image``;

const LinkContainer = styled.TouchableOpacity`
  margin-bottom: 24;
`;

const LogoutContainer = styled(LinkContainer)`
  margin-bottom: 0;
`;

const LinkText = styled(components.TextRegular)`
  font-size: 18;
  color: ${colors.black};
`;
