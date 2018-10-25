import React, { PureComponent } from 'react';
import {
  Image, StatusBar, View, Alert,
} from 'react-native';

import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { LoginManager as FacebookLoginManager } from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GoogleSignin as GoogleLoginManager } from 'react-native-google-signin';

import AuthInput from '../components/AuthInput';
import {
  images, colors, device, components,
} from '../global';
import { setError } from '../redux/common/actions';
import { requestSignInUser, requestSignUpUser } from '../redux/auth/actions';
import { spotifyAuthOptions /* googleAuthOptions */ } from '../services/auth';

type Props = {
  navigation: Object,
  requestSignInUser: Function,
  requestSignUpUser: Function,
};

class AuthScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };

  state = {
    error: {
      name: '',
    },

    isSignUp: false,
  };

  handleAuthSpotify = async () => {
    const loggedIn = await Spotify.login();
    if (loggedIn) {
      try {
        const authInfo = await Spotify.getAuthAsync();

        if (authInfo && authInfo.accessToken) {
          // this.props.setToken(authInfo.accessToken);
          const user = await Spotify.getMe();

          console.log('successfully log in to spotify with user data', {
            authInfo,
            user,
          });

          //  use code below to login with spotify backend endpoint

          /* const userInfo = JSON.stringify({
            email: user && user.email,
            first_name: user && user.display_name,
            last_name: user && user.display_name,
            artists: [],
          });

          API.post('users/social/login/spotify', userInfo)
            .then((res) => {
              console.log(777, 'spotify', res);
            })
            .catch((e) => {
              console.log(555, 'spotify', e);
            }); */
        }
      } catch (err) {
        alert('Error', err.message);
      }
    } else {
      alert('Spotify Auth Error');
    }
  };

  handleAuthGoogle = async () => {
    try {
      /* commented because of google login lib bug
       await GoogleLoginManager.hasPlayServices();
       const userInfo = await GoogleLoginManager.signIn();
       console.log(userInfo); */
    } catch (error) {
      console.log(error);
    }
  };

  handleAuthFb = () => {
    FacebookLoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions}`,
          );
        }
      },
      (error) => {
        console.log(`Login fail with error: ${error}`);
      },
    );
  };

  handleToggleAuthMode = () => {
    const { nameRef, emailRef, passwordRef } = this;
    nameRef.input.clear();
    emailRef.input.clear();
    passwordRef.input.clear();
    this.setState(({ isSignUp }) => ({ isSignUp: !isSignUp }));
  };

  handleEnter = () => {
    const { isSignUp } = this.state;
    const { navigation, requestSignInUser, requestSignUpUser } = this.props;

    const user = {
      name: this.nameRef.input._getText(),
      email: this.emailRef.input._getText(),
      password: this.passwordRef.input._getText(),
    };

    if (isSignUp) {
      this.props.requestSignUpUser(user);
      return;
    }

    requestSignInUser(user);
  };

  render() {
    const { isSignUp } = this.state;
    const { error, setError } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          extraHeight={100}
          contentContainerStyle={{ flex: 1 }}
        >
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          <MainContent>
            <Logo source={images.logoChune} reducedMargin={isSignUp} />
            <Invitation>{`Sign ${isSignUp ? 'up' : 'in'}`}</Invitation>
            <InvitationPromptEmail>by email</InvitationPromptEmail>
            {error
              && Alert.alert('Error', error, [
                { text: 'OK', onPress: () => setError() },
              ])}
            <Form>
              <FormField
                invisible={!isSignUp}
                label="Name"
                refCallback={(el) => {
                  this.nameRef = el;
                }}
              />
              <FormField
                label="Email"
                refCallback={(el) => {
                  this.emailRef = el;
                }}
              />
              <FormField
                password
                label="Password"
                refCallback={(el) => {
                  this.passwordRef = el;
                }}
              />
            </Form>
            {!isSignUp && (
              <ForgetPasswordButton>
                <ForgetPasswordText>Forgot password?</ForgetPasswordText>
              </ForgetPasswordButton>
            )}
            <EnterButton onPress={this.handleEnter}>
              <EnterButtonText>
                {`Sign ${isSignUp ? 'up' : 'in'}`}
              </EnterButtonText>
            </EnterButton>
            <InvitationPromptSocials>or by socials</InvitationPromptSocials>
            <ExternalAuthContainer>
              <SpotifyButton onPress={this.handleAuthSpotify}>
                <SpotifyButtonImage source={images.logoSpotify} />
              </SpotifyButton>
              <Socials>
                <FacebookButton onPress={this.handleAuthFb}>
                  <Image source={images.logoFacebook} />
                </FacebookButton>
                <TwitterButton>
                  <Image source={images.logoTwitter} />
                </TwitterButton>
                <GoogleButton onPress={this.handleAuthGoogle}>
                  <Image source={images.logoGooglePlus} />
                </GoogleButton>
              </Socials>
            </ExternalAuthContainer>
          </MainContent>
          <SnackBar shrinkedText={isSignUp}>
            <SnackBarText>
              {isSignUp ? 'Have an account?' : "Don't have an account?"}
            </SnackBarText>
            <ToggleEnterModeButton onPress={this.handleToggleAuthMode}>
              <ToggleEnterModeButtonText>
                {`Sign ${isSignUp ? 'in' : 'up'}`}
              </ToggleEnterModeButtonText>
            </ToggleEnterModeButton>
          </SnackBar>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setError,
    requestSignInUser,
    requestSignUpUser,
  },
  dispatch,
);

export default connect(
  ({ common: { error } }) => ({ error }),
  mapDispatchToProps,
)(AuthScreen);

const EnterButton = styled.TouchableOpacity`
  height: 45;
  width: 100%;
  border-radius: 3;
  justify-content: center;
  background-color: ${colors.accent};
`;

const MainContent = styled.View`
  flex: 1;
  padding-top: 35;
  padding-bottom: 30;
  align-items: center;
  padding-horizontal: 16;
  background-color: white;
`;

const Logo = styled.Image`
  margin-bottom: ${({ reducedMargin }) => (reducedMargin ? '35' : '60')};
`;

const Invitation = styled(components.TextMedium)`
  font-size: 20;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30;
  color: ${colors.black};
`;

const InvitationPromptEmail = styled(components.TextRegular)`
  font-size: 14;
  color: ${colors.greyPrompts};
`;

const InvitationPromptSocials = styled(InvitationPromptEmail)`
  margin-top: 25;
  margin-bottom: 15;
`;

const Form = styled.View`
  width: 100%;
  margin-bottom: 15;
`;

const ForgetPasswordButton = styled.TouchableOpacity`
  margin-bottom: 20;
`;

const ForgetPasswordText = styled.Text`
  color: ${colors.accent};
  font-size: 16;
`;

const EnterButtonText = styled.Text`
  font-size: 16;
  text-align: center;
  color: ${colors.white};
`;

const SnackBar = styled.View`
  width: 100%;
  flex-direction: row;
  border-top-width: 1;
  align-items: center;
  padding-vertical: 10;
  background-color: #f2f2f2;
  justify-content: space-between;
  border-top-color: ${colors.grey};
  height: ${device.isIphoneX ? 55 : 44};
  padding-horizontal: ${({ shrinkedText }) => (shrinkedText ? 90 : 70)};
`;

const ToggleEnterModeButtonText = styled(components.TextMedium)`
  font-size: 20;
  font-weight: 600;
  color: ${colors.accent};
`;

const Socials = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 17;
  justify-content: space-between;
`;

const SpotifyButton = styled.TouchableOpacity`
  border-width: 1;
  border-radius: 10;
  margin-bottom: 20;
  border-color: #979797;
  justify-content: center;
`;

const SpotifyButtonImage = styled.Image`
  margin-vertical: 4;
  margin-horizontal: 28;
`;

const FormField = styled(AuthInput)``;
const ExternalAuthContainer = styled.View``;
const GoogleButton = styled.TouchableOpacity``;
const TwitterButton = styled.TouchableOpacity``;
const FacebookButton = styled.TouchableOpacity``;
const SnackBarText = styled(components.TextRegular)``;
const ToggleEnterModeButton = styled.TouchableOpacity``;
