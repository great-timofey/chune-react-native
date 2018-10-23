import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { getDataHome } from '../redux/data/actions';
import { colors, components, utils } from '../global';
import { MainCard, ListCard } from '../components/home';

class DrawerMenuScreen extends PureComponent {
  render() {
    <View>
      <TouchableOpacity>
        <Text>option 1</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>option 2</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>option 3</Text>
      </TouchableOpacity>
    </View>;
  }
}

export default DrawerMenuScreen;
const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
