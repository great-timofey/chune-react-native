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
    if (contentFeed.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>
            You have no currently followed or recommended artists. Use 'Search'
            menu below
          </Text>
        </View>
      );
    }
    return (
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
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default connect(
  ({
    auth: { token },
    data: {
      forYou: { contentFeed, loading },
    },
  }) => ({
    token,
    loading,
    contentFeed,
  }),
  { getDataForYou },
)(ForYouScreen);
