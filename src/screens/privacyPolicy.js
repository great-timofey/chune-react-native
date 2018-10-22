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

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDataHome } from '../redux/data/actions';
import { platformSelect } from '../global/utils';
import { colors, components, utils } from '../global';
import { MainCard, ListCard } from '../components/home';

class PrivacyPolicyScreen extends PureComponent {
  /* static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Icon.Button name="arrowBack" onPress={() => navigation.goBack()} />
    ),
  }); */

  static navigationOptions = {
    title: 'Privacy Policy',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
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
      </View>
    );
  }
}

export default PrivacyPolicyScreen;
const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
