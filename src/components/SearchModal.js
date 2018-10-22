import React, { Component, Fragment } from 'react';
import {
  View,
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
import { toggleSearch } from '../redux/common/actions';
import {
  requestSearchArtist,
  setSearchArtistResult,
  getDataArtistsEventsSingle,
} from '../redux/data/actions';

class SearchModal extends Component {
  state = {
    query: '',
  };

  handleSearch = (query) => {
    const { requestSearchArtist } = this.props;
    this.setState({ query }, () => requestSearchArtist(query));
  };

  handleClose = () => {
    const { setSearchArtistResult, toggleSearch } = this.props;
    this.setState({ query: '' });
    setSearchArtistResult([]);
    toggleSearch();
  };

  handleChooseOption = (artistName) => {
    const { getDataArtistsEventsSingle, drillCallback } = this.props;
    getDataArtistsEventsSingle(artistName);
    toggleSearch();
    drillCallback(artistName);
    this.handleClose();
  };

  renderOption = ({ item: { name } }) => (
    <TouchableOpacity onPress={() => this.handleChooseOption(name)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );

  render() {
    const { query } = this.state;
    const {
      isSearchOpen, toggleSearch, loading, results,
    } = this.props;
    return (
      <ViewOverflow>
        <ModalView
          isVisible={isSearchOpen}
          animationInTiming={1}
          animationOutTiming={1}
        >
          <SearchField
            autoFocus
            placeholder="Search to find and follow artist"
            onChangeText={this.handleSearch}
            value={query}
          />
          <View
            style={{
              width: 30,
              height: 30,
              top: 0,
              right: 5,
              zIndex: 1,
              position: 'absolute',
            }}
          >
            <Icon.Button
              name="x"
              size={20}
              color="black"
              backgroundColor="transparent"
              onPress={this.handleClose}
              iconStyle={{
                width: 20,
                height: 20,
                padding: 0,
                marginRight: 0,
              }}
              borderRadius={0}
            />
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList data={results} renderItem={this.renderOption} />
          )}
        </ModalView>
      </ViewOverflow>
    );
  }
}

export default connect(
  ({
    common: { isSearchOpen },
    data: {
      search: { loading, results },
    },
  }) => ({
    isSearchOpen,
    loading,
    results,
  }),
  {
    getDataArtistsEventsSingle,
    requestSearchArtist,
    setSearchArtistResult,
    toggleSearch,
  },
)(SearchModal);

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

const SearchField = styled.TextInput`
  height: 40;
  width: 100%;
  font-size: 18;
  padding-left: 20;
`;
