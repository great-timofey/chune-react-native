import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import images from '../../global/images';

export default ({ onFbAuth, onTwitterAuth, onGoogleAuth }) => (
  <View style={styles.socialsContainer}>
    <TouchableOpacity onPress={onFbAuth}>
      <Image source={images.logo_facebook} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onTwitterAuth}>
      <Image source={images.logo_twitter} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onGoogleAuth}>
      <Image source={images.logo_google_plus} />
    </TouchableOpacity>
  </View>
);
