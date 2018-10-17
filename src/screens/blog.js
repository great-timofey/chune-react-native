import React, { PureComponent } from 'react';
import {
  WebView,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { colors, components, utils } from '../global';

class BlogScreen extends PureComponent {
  render() {
    return <WebView source={{ uri: 'https://blog.chunesupply.com/' }} />;
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(BlogScreen);
