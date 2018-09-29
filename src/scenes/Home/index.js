import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Spotify from 'rn-spotify-sdk'
import { LoginButton, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

import styles from './styles'

type Props = {
  navigation: Object,
};

class Home extends Component<Props> {
  state = {
    isLogged: false,
  };

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId:
        '839963583954-do66c05dv80tm42e1gpfhgf4pevfvddm.apps.googleusercontent.com',
    })

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
    }

    Spotify.initialize(spotifyOptions)
  }

  _handleAuthSpotify = async () => {
    const loggedIn = await Spotify.login()
    if (loggedIn) {
      try {
        const authInfo = await Spotify.getAuthAsync()
        console.log(authInfo)
        this.setState({ isLogged: true })
      } catch (err) {
        alert('Error', err.message)
      }
    } else {
      alert('Spotify Auth Error')
    }
  };

  _handleAuthGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
      this.setState({ isLogged: true })
    } catch (error) {
      console.log(error)
    }
  };

  _handleAuthFb = async (error, result) => {
    if (error) {
      console.log(`login has error: ${result.error}`)
    } else if (result.isCancelled) {
      console.log('login is cancelled.')
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data.accessToken.toString())
      })
      this.setState({ isLogged: true })
    }
  };

  render() {
    const { navigation } = this.props
    const { isLogged } = this.state
    return (
      <View style={styles.container}>
        <Text>{isLogged ? 'logged' : 'not logged'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this._handleAuthSpotify}
        >
          <Text style={styles.buttonText}>Continue with Spotify</Text>
        </TouchableOpacity>
        <LoginButton onLoginFinished={this._handleAuthFb} />
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._handleAuthGoogle}
        />
        <TouchableOpacity
          disabled={!isLogged}
          onPress={() => navigation.navigate('Counter')}
        >
          <Text>Go To Player</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default Home
