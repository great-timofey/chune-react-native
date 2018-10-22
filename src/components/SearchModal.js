import React, { PureComponent } from 'react';
import {
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ViewOverflow from 'react-native-view-overflow';

import {
  requestSearchArtist,
  setSearchArtistResult,
  getDataArtistsEventsSingle,
} from '../redux/data/actions';
import { utils, components, colors } from '../global';
import { toggleSearch } from '../redux/common/actions';

class SearchModal extends PureComponent {
  state = {
    query: '',
  };

  handleSearch = (query) => {
    const { requestSearchArtist } = this.props;
    this.setState({ query }, () => requestSearchArtist(query));
  };

  handleClose = () => {
    const { setSearchArtistResult, toggleSearch, results } = this.props;
    if (results.length !== 0) {
      setSearchArtistResult([]);
    }
    this.setState({ query: '' });
    toggleSearch();
  };

  handleChooseOption = (artistName) => {
    const { getDataArtistsEventsSingle, drillCallback } = this.props;
    drillCallback();
    getDataArtistsEventsSingle(artistName);
    this.handleClose();
  };

  renderOption = ({ item: { name } }) => (
    <ResultButton onPress={() => this.handleChooseOption(name)}>
      <ResultButtonText>{name}</ResultButtonText>
    </ResultButton>
  );

  render() {
    const { query } = this.state;
    const {
      isSearchOpen, toggleSearch, loading, results,
    } = this.props;
    return (
      <ViewOverflow>
        <ModalView
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={isSearchOpen}
          onBackdropPress={this.handleClose}
        >
          <SearchField
            autoFocus
            value={query}
            onChangeText={this.handleSearch}
            placeholder="Search to find and follow artist"
          />
          <ClearButtonView>
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
          </ClearButtonView>
          {loading ? (
            <LoadingView>
              <ActivityIndicator color={colors.accent} />
            </LoadingView>
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
  padding-left: 20;
  position: absolute;
  background-color: white;
  align-items: flex-start;
  width: ${utils.deviceWidth};
  ${Platform.select({
    android: {
      top: -10,
      left: -18,
    },
    ios: {
      top: 10,
      left: -19,
    },
  })};
`;

const SearchField = styled.TextInput`
  height: 40;
  width: 100%;
  font-size: 18;
`;

const ClearButtonView = styled.View`
  top: 0;
  right: 5;
  width: 30;
  height: 30;
  z-index: 1;
  position: absolute;
`;

const LoadingView = styled.View`
  position: absolute;
  top: 10;
  right: 30;
`;

const ResultButton = styled.TouchableOpacity`
  height: 20;
  margin-bottom: 5;
`;

const ResultButtonText = styled(components.TextRegular)`
  font-size: 17;
`;
