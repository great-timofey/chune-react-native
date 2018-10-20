import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  WebView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { MainCard, ListCard } from '../components/home';

import { colors, components, utils } from '../global';
import { API, setAuthToken } from '../services/chuneAPI';

class HomeScreen extends PureComponent {
  state = {
    content: {
      featured: [],
      contentFeed: [],
    },
    loading: true,
  };

  componentDidMount() {
    const { token } = this.props;
    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    // API.post('users/', user)
    if (token) {
      setAuthToken(token);
    } else {
      API.post('users/login', user)
        .then(res => res.data.token)
        .then(tok => setAuthToken(tok));
    }

    API.get('content/?filter=recent&start=0&max_results=30')
      .then(res => res.data)
      .then(({ featured, content_feed: contentFeed }) => this.setState(state => ({
        ...state,
        ...{ content: { featured, contentFeed } },
      })))
      .then(res => this.setState({ loading: false }));
  }

  renderCard = ({ item: { ...data } }) => {
    const { modalCallback } = this.props;
    return <ListCard {...data} callback={modalCallback} />;
  };

  render() {
    const { modalCallback } = this.props;
    const { loading, content } = this.state;
    return (
      <ScreenContainer>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScreenScrollContainer>
            <MainCard
              main
              data={content.featured[0]}
              callback={modalCallback}
            />
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
                <MainCard data={content.featured[1]} callback={modalCallback} />
                <MainCard data={content.featured[2]} callback={modalCallback} />
              </View>
              <FlatList
                data={content.contentFeed}
                renderItem={this.renderCard}
                keyExtractor={item => item.id}
              />
            </View>
          </ScreenScrollContainer>
        )}
      </ScreenContainer>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(HomeScreen);

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
