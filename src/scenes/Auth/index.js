import Spotify from 'rn-spotify-sdk';
import React, { PureComponent, Fragment } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LoginManager as FacebookLoginManager } from 'react-native-fbsdk';
import { GoogleSignin as GoogleLoginManager } from 'react-native-google-signin';

import styles from './styles';
import images from '../../global/images';
import colors from '../../global/colors';
import AuthInput from '../../components/AuthInput';
import AuthSocials from '../../components/AuthSocials';
import SpotifySignInButton from '../../components/SpotifySignInButton';
import { spotifyAuthOptions, googleAuthOptions } from '../../services';

type Props = {
  navigation: Object,
};

export default class Auth extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };

  state = {
    userInfo: null,
    authorized: false,
    input: '',
    error: {
      name: '',
    },

    isSignUp: false,
  };

  componentDidMount() {
    GoogleLoginManager.configure({
      iosClientId: googleAuthOptions.iosClientId,
    });

    Spotify.initialize(spotifyAuthOptions);
  }

  _validate = some => {
    this.setState({ input: some });
    if (this.state.input.length > 1) {
      this.setState({ error: { name: 'wrong name' } });
    } else {
      this.setState({ error: { name: null } });
    }
  };

  _handleAuthSpotify = async () => {
    const loggedIn = await Spotify.login();
    if (loggedIn) {
      try {
        const authInfo = await Spotify.getAuthAsync();
        console.log(authInfo);
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
      await GoogleLoginManager.hasPlayServices();
      const userInfo = await GoogleLoginManager.signIn();
      console.log(userInfo);
      this.setState({ authorized: true });
    } catch (error) {
      console.log(error);
    }
  };

  _handleAuthFb = () => {
    FacebookLoginManager.logInWithReadPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions.toString()}`
          );
          this.setState({ authorized: true });
        }
      },
      error => {
        console.log(`Login fail with error: ${error}`);
      }
    );
  };

  _handleEnter = () => {
    const { authorized } = this.state;
    const { navigation } = this.props;
    if (authorized) {
      navigation.navigate('Home');
    } else {
      console.log('user is not authorized');
    }
  };

  render() {
    const { isSignUp } = this.state;
    return (
      <Fragment>
        <View style={styles.container}>
          <Image
            source={images.logo_chune}
            style={[styles.logo, !isSignUp && { marginBottom: 60 }]}
          />
          <Text style={styles.greeting}>
            {`Sign ${isSignUp ? 'up' : 'in'}`}
          </Text>
          <Text style={styles.loginInfo}>by email</Text>
          <View style={styles.inputContainer}>
            {isSignUp && (
              <AuthInput
                label="Name"
                validation={this._validate}
                error={this.state.error.name}
              />
            )}
            <AuthInput label="Email" />
            <AuthInput label="Password" password />
          </View>
          {!isSignUp && (
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={this._handleEnter}
            style={styles.enterButton}
          >
            <Text style={styles.enterButtonText}>
              {`Sign ${isSignUp ? 'up' : 'in'}`}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.loginInfo, { marginTop: 25, marginBottom: 15 }]}>
            or by socials
          </Text>
          <View>
            <SpotifySignInButton onPress={this._handleAuthSpotify} />
            <AuthSocials
              onFbAuth={this._handleAuthFb}
              onGoogleAuth={this._handleAuthGoogle}
            />
          </View>
        </View>
        <View
          style={[styles.snackBar, { paddingHorizontal: isSignUp ? 90 : 70 }]}
        >
          <Text>
            {isSignUp ? 'Have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.setState(({ isSignUp }) => ({ isSignUp: !isSignUp }))
            }
          >
            <Text style={styles.snackBarButtonText}>
              {`Sign ${isSignUp ? 'in' : 'up'}`}
            </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}
