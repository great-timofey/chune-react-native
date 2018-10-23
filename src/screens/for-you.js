import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { MainCard, ListCard } from '../components/home';
import {
  API,
  setAuthToken,
  getContentForYouFirst,
  getContentForYouSecond,
} from '../services/chuneAPI';
import { getDataForYou } from '../redux/data/actions';

import {
  colors, components, utils, device,
} from '../global';

class ForYouScreen extends PureComponent {
  renderCard = ({ item: { ...data } }) => {
    const { modalCallback } = this.props;
    return <ListCard {...data} callback={modalCallback} />;
  };

  render() {
    const {
      loading, contentFeed, getDataForYou, modalCallback,
    } = this.props;
    return loading ? (
      <ActivityIndicator />
    ) : (
      <FlatList
        contentContainerStyle={
          device.isAndroid && {
            paddingHorizontal: 8,
            paddingTop: 8,
          }
        }
        style={
          device.isIOS && {
            paddingHorizontal: 8,
            paddingTop: 8,
          }
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getDataForYou} />
        }
        data={contentFeed}
        renderItem={this.renderCard}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default connect(
  ({ auth, data: { forYou } }) => ({
    token: auth.token,
    contentFeed: forYou.contentFeed,
    loading: !forYou.contentFeed.length,
  }),
  { getDataForYou },
)(ForYouScreen);
