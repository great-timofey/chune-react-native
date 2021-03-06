import React, { PureComponent } from 'react';
import {
  View,
  Alert,
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

class HomeScreen extends PureComponent {
  renderCard = ({ item: { ...data } }) => {
    const { modalCallback } = this.props;
    return <ListCard {...data} callback={modalCallback} />;
  };

  render() {
    const {
      loading,
      featured,
      contentFeed,
      getDataHome,
      modalCallback,
    } = this.props;
    return (
      <ScreenContainer>
        {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
        ) : (
          <ScreenScrollContainer
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getDataHome} />
            }
          >
            <MainCard main data={featured[0]} callback={modalCallback} />
            <View
              style={{
                //  other cards container
                paddingHorizontal: 8,
                paddingTop: 8,
              }}
            >
              <View
                style={{
                  //  first two other cards container
                  width: '100%',
                  height: utils.deviceHeight * 0.295,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 8,
                }}
              >
                <MainCard data={featured[1]} callback={modalCallback} />
                <MainCard data={featured[2]} callback={modalCallback} />
              </View>
              <FlatList
                data={contentFeed}
                renderItem={this.renderCard}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScreenScrollContainer>
        )}
      </ScreenContainer>
    );
  }
}

export default connect(
  ({
    auth: { token },
    data: {
      home: { featured, contentFeed },
    },
    common: { activeTabIndex },
  }) => ({
    token,
    featured,
    contentFeed,
    activeTabIndex,
    loading: !featured.length && !contentFeed.length,
  }),
  { getDataHome },
)(HomeScreen);

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
