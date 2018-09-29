import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

import styles from './styles';

type Props = {
  navigation: Object,
};

class Home extends Component<Props> {
  constructor() {
    super();

    this.state = {
      spotifyInitialized: false,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId:
        '839963583954-do66c05dv80tm42e1gpfhgf4pevfvddm.apps.googleusercontent.com',
    });

    const spotifyOptions = {
      clientID: '7f3b314d392d405dabc16fb93308762a',
      sessionUserDefaultsKey: 'SpotifySession',
      redirectURL: 'rnspotify://auth',
      scopes: [
        'user-read-private',
        'playlist-read',
        'playlist-read-private',
        'streaming',
      ],
    };
    console.log('hi');
    console.log(spotifyOptions);
    Spotify.initialize(spotifyOptions).then(_ => Spotify.login()
      .then(async (loggedIn) => {
        if (loggedIn) {
          // logged in
          // alert('logged');
          // this.goToPlayer();
          const authInfo = await Spotify.getAuthAsync();
          console.log(authInfo);
          this.setState({ spotifyInitialized: true });
        } else {
          // cancelled
        }
      })
      .catch((error) => {
        // error
        alert('Error', error.message);
      }));
    // initialize Spotify if it hasn't been initialized yet
    // if (!Spotify.isInitialized()) {
    //   // initialize spotify
    //     // update UI state
    //     alert('logged');
    //     // handle initialization
    //     if (loggedIn) {
    //       // this.goToPlayer();
    //     }
    //   }).catch((error) => {
    //     Alert.alert('Error', error.message);
    //   });
    // }
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { spotifyInitialized } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Counter')}
        >
          <Text style={styles.buttonText}>
            {spotifyInitialized ? 'yep' : 'no'}
          </Text>
        </TouchableOpacity>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
        />
      </View>
    );
  }
}
export default Home;
