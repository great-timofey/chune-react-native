import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';

import { colors } from '../global';

export default ({ isVisible, callback }) => (
  <Modal
    swipeThreshold={100}
    swipeDirection="down"
    onSwipe={callback}
    isVisible={isVisible}
  >
    <View
      style={{
        flex: 1,
        top: 0,
        left: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        height: Dimensions.get('window').height * 0.97,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
      }}
    >
      <Text>Hello!</Text>
      <TouchableOpacity onPress={callback}>
        <Text>hide me</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);
