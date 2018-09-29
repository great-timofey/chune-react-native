import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';
import images from '../../global/images';

export default ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.spotifyLoginButton}>
    <Image source={images.logo_spotify} style={styles.spotifyLoginImage} />
  </TouchableOpacity>
);
