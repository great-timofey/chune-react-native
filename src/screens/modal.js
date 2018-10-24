import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Button,
  WebView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../global';
import { width, height, isAndroid } from '../global/device';

export default class ModalScreen extends Component {
  static navigationOptions = {
    header: () => (isAndroid ? null : (
      <View style={{ height: 20, backgroundColor: '#52146C' }} />
    )),
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonAndroid,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButtonAndroid = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
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
            top: isAndroid ? 10 : 20,
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
