import React, { PureComponent } from 'react';
import { WebView } from 'react-native';
import styled from 'styled-components';

import { colors, components, utils } from '../global';

export default ({ url }) => <WebView source={{ uri: url }} />;
