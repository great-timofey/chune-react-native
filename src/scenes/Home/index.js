import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import styles from './styles';

type Props = {
  navigation: Object
}

class Home extends Component<Props> {
  constructor() {
    super();

    this.state = {
      spotifyInitialized: false,
    };
  }

  componentDidMount() {
    const spotifyOptions = {
      clientID: '7f3b314d392d405dabc16fb93308762a',
      sessionUserDefaultsKey: 'SpotifySession',
      redirectURL: 'rnspotify://auth',
      scopes: ['user-read-private', 'playlist-read', 'playlist-read-private', 'streaming'],
    };
    Spotify.initialize(spotifyOptions).then(_ => Spotify.login().then((loggedIn) => {
      if (loggedIn) {
        // logged in
        // alert('logged');
        // this.goToPlayer();
        this.setState({ spotifyInitialized: true });
      } else {
        // cancelled
      }
    }).catch((error) => {
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

  render() {
    const { navigation } = this.props;
    const { spotifyInitialized } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Counter')}>
          <Text style={styles.buttonText}>{spotifyInitialized ? 'yep' : 'no'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
