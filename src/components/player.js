import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import ViewOverflow from 'react-native-view-overflow';

import { colors } from '../global';

/*
        style={{
          ...Platform.select({
            ios: {
              flex: 1,
              top: 0,
              left: -20,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: 'absolute',
              height: Dimensions.get('window').height * 0.97,
              width: Dimensions.get('window').width,
              backgroundColor: 'white',
            },
            android: {
              overflow: 'visible',
              backgroundColor: 'yellow',
              width: 1000,
              height: 1200,
            },
          }),
        }}
        */

export default ({ isVisible, callback }) => (
  <ViewOverflow>
    <Modal
      swipeThreshold={100}
      swipeDirection="down"
      onSwipe={callback}
      isVisible={isVisible}
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        width: Dimensions.get('window').width,
        ...Platform.select({
          android: {
            top: -10,
            left: -18,
          },
          ios: {
            top: 10,
            left: -20,
          },
        }),
      }}
    >
      <Text>Hello!</Text>
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
        }}
        onPress={callback}
      >
        <Text>hide me</Text>
      </TouchableOpacity>
    </Modal>
  </ViewOverflow>
);
