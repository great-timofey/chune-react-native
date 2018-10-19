import {
  View, WebView, Text, TouchableOpacity, Button,
} from 'react-native';
import React, { Component, Fragment } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { width, height } from '../global/device';
import { colors } from '../global';

export default class ModalScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('url', 'www.google.com');
    return (
      <Fragment>
        <View
          style={{
            width: 30,
            height: 30,
            top: 10,
            right: 10,
            zIndex: 1,
            position: 'absolute',
          }}
        >
          <Icon.Button
            name="x"
            color="white"
            backgroundColor="transparent"
            size={24}
            onPress={() => navigation.goBack()}
            iconStyle={{
              width: 24,
              height: 24,
              padding: 0,
              marginRight: 0,
            }}
            borderRadius={0}
          />
        </View>
        <WebView
          originWhitelist={['*']}
          style={{ width, height }}
          source={{
            uri,
          }}
        />
      </Fragment>
    );
  }
}
