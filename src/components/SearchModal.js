import React, { Component, Fragment } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/Feather';
import ViewOverflow from 'react-native-view-overflow';
import { utils } from '../global';

import { API } from '../services/chuneAPI';

class SearchModal extends Component<Props> {
  state = {
    options: [],
    query: '',
  };

  handleSearch = () => {
    API.get(`artists/search/${this.state.query}/`).then(({ data: options }) => this.setState({ options }));
  };

  handleClear = () => {
    this.setState({ options: [], query: '' });
  };

  renderOption = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.showCallback();
        this.props.drillCallback(item.name);
        this.handleClear();
      }}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    const { options, query } = this.state;
    const { isVisible, showCallback, loading } = this.props;
    return (
      <ViewOverflow>
        <ModalView isVisible={isVisible}>
          <TextInput
            style={{ height: 50, width: 100, borderColor: 'grey' }}
            onChangeText={query => this.setState({ query })}
            value={query}
          />
          <TouchableOpacity onPress={this.handleClear}>
            <Text>clear</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleSearch}>
            <Text>search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showCallback}>
            <Text>close</Text>
          </TouchableOpacity>
          <FlatList data={options} renderItem={this.renderOption} />
        </ModalView>
      </ViewOverflow>
    );
  }
}

export default SearchModal;

const ModalView = styled(Modal)`
  top: 0;
  flex: 1;
  position: absolute;
  background-color: white;
  width: ${utils.deviceWidth};
  ${Platform.select({
    android: {
      top: -10,
      left: -18,
    },
    ios: {
      top: 10,
      left: -19,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  })};
`;
