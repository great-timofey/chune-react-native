import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';

import Spotify from 'rn-spotify-sdk';
import styled from 'styled-components';
import { LoginManager as FacebookLoginManager } from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GoogleSignin as GoogleLoginManager } from 'react-native-google-signin';

import images from '~global/images';
import colors from '~global/colors';
import AuthInput from '~components/AuthInput';
import { setToken } from '~redux/auth/actions';

import { API, setUserToken } from '~services/chune-api';
import { spotifyAuthOptions /* googleAuthOptions */ } from '~services/auth';

type Props = {
  navigation: Object,
};

class AuthScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };

  state = {
    userInfo: null,
    authorized: false,
    //  for testing
    input: '',
    error: {
      name: '',
    },

    isSignUp: false,
  };

  componentDidMount() {
    // GoogleLoginManager.configure({
    // iosClientId: googleAuthOptions.iosClientId,
    // });

    Spotify.initialize(spotifyAuthOptions);
  }

  _handleAuthSpotify = async () => {
    const loggedIn = await Spotify.login();
    if (loggedIn) {
      try {
        const authInfo = await Spotify.getAuthAsync();

        if (authInfo && authInfo.accessToken) {
          this.props.setToken(authInfo.accessToken);
          const user = await Spotify.getMe();

          console.log(333, { authInfo, user });

          const userInfo = JSON.stringify({
            email: user && user.email,
            first_name: user && user.display_name,
            last_name: user && user.display_name,
            artists: [],
          });

          API.post('users/social/login/spotify', userInfo)
            .then((res) => { console.log(777, 'spotify', res); })
            .catch((e) => { console.log(555, 'spotify', e); });
        }
        this.setState({ authorized: true });
      } catch (err) {
        alert('Error', err.message);
      }
    } else {
      alert('Spotify Auth Error');
    }
  };

  _handleAuthGoogle = async () => {
    try {
      //  commented because of google login lib bug
      // await GoogleLoginManager.hasPlayServices();
      // const userInfo = await GoogleLoginManager.signIn();
      // console.log(userInfo);
      this.setState({ authorized: true });
    } catch (error) {
      console.log(error);
    }
  };

  _handleAuthFb = () => {
    FacebookLoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions}`,
          );
          this.setState({ authorized: true });
        }
      },
      (error) => {
        console.log(`Login fail with error: ${error}`);
      },
    );
  };

  handleEnter = () => {
    const { authorized } = this.state;
    const { navigation } = this.props;
    if (authorized) {
      navigation.navigate('Home');
    } else {
      // this.props.setToken();

      const user = JSON.stringify({
        // name,
        email: this.emailRef.input._getText(),
        password: this.passwordRef.input._getText(),
      });

      API.post('users/login', user)
        .then(res => res.data.token)
        .then((token) => { setUserToken(token); this.props.setToken(token); })
        .then(_ => API.get('content/?filter=recent&start=0&max_results=10'))
        .then((res) => { console.log('DATA', res.data); return res.data; })
        .then(_ => console.log(this.state))
        .then(res => this.setState({ loading: false }));

      console.log('user is not authorized');
    }
  };

  render() {
    const { isSignUp } = this.state;
    return (
      <KeyboardAwareScrollView extraScrollHeight={100}>
        <MainContent>
          <Logo source={images.logoChune} reducedMargin={isSignUp} />
          <Invitation>{`Sign ${isSignUp ? 'up' : 'in'}`}</Invitation>
          <InvitationPromptEmail>by email</InvitationPromptEmail>
          <Form>
            {isSignUp && <FormField label="Name" />}
            <FormField label="Email" refCallback={(el) => { this.emailRef = el; }} />
            <FormField
              password
              label="Password"
              refCallback={(el) => { this.passwordRef = el; }}
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
            <SpotifyButton onPress={this._handleAuthSpotify}>
              <SpotifyButtonImage source={images.logoSpotify} />
            </SpotifyButton>
            <Socials>
              <FacebookButton onPress={this._handleAuthFb}>
                <Image source={images.logoFacebook} />
              </FacebookButton>
              <TwitterButton>
                <Image source={images.logoTwitter} />
              </TwitterButton>
              <GoogleButton onPress={this._handleAuthGoogle}>
                <Image source={images.logoGooglePlus} />
              </GoogleButton>
            </Socials>
          </ExternalAuthContainer>
        </MainContent>
        <SnackBar shrinkedText={isSignUp}>
          <SnackBarText>
            {isSignUp ? 'Have an account?' : "Don't have an account?"}
          </SnackBarText>
          <ToggleEnterModeButton
            onPress={() => this.setState(({ isSignUp }) => ({ isSignUp: !isSignUp }))
            }
          >
            <ToggleEnterModeButtonText>
              {`Sign ${isSignUp ? 'in' : 'up'}`}
            </ToggleEnterModeButtonText>
          </ToggleEnterModeButton>
        </SnackBar>
      </KeyboardAwareScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setToken,
  }, dispatch)
);

export default connect(() => ({}), mapDispatchToProps)(AuthScreen);

const EnterButton = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${colors.accent};
  width: 100%;
  height: 45;
  border-radius: 3;
`;

const MainContent = styled.View`
  flex: 1;
  padding-top: 35;
  padding-bottom: 30;
  padding-horizontal: 16;
  align-items: center;
  background-color: white;
`;

const Logo = styled.Image`
  margin-bottom: ${props => (props.reducedMargin ? '35' : '60')};
`;

const Invitation = styled.Text`
  font-size: 20;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30;
  color: ${colors.black};
`;

const InvitationPromptEmail = styled.Text`
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
  padding-vertical: 10;
  padding-horizontal: ${props => (props.shrinkedText ? 90 : 70)};
  background-color: #f2f2f2;
  width: 100%;
  height: 44;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  border-top-width: 1;
  border-top-color: ${colors.grey};
`;

const ToggleEnterModeButtonText = styled.Text`
  color: ${colors.accent};
  font-weight: 700;
  font-size: 20;
`;

const Socials = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 17;
`;

const SpotifyButton = styled.TouchableOpacity`
  justify-content: center;
  border-width: 1;
  border-radius: 10;
  border-color: #979797;
  margin-bottom: 20;
`;

const SpotifyButtonImage = styled.Image`
  margin-vertical: 4;
  margin-horizontal: 28;
`;

const SnackBarText = styled.Text``;
const FormField = styled(AuthInput)``;
const ExternalAuthContainer = styled.View``;
const GoogleButton = styled.TouchableOpacity``;
const TwitterButton = styled.TouchableOpacity``;
const FacebookButton = styled.TouchableOpacity``;
const ToggleEnterModeButton = styled.TouchableOpacity``;
