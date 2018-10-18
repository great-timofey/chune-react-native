import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  WebView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    const token = this.props.token;
    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    /*
    const raw = '{"id":"AvzorXK","title":"Listen To Anderson .Paak & Kendrick Lamars Must Hear Smooth New Collab Tints","artist_name":"Kendrick Lamar","published_on":"2018-10-04T17:09:54Z","image":"d9ee37aabae9bf20b5a01bee48777b1ca12d5aaa.jpg","url":"http://thissongissick.com/post/anderson-paak-kendrick-lamar-tints","source_name":"This Song Is Sick","type":"article"}';

    const contentFeed = [JSON.parse(raw)];
    console.log(contentFeed);
    this.setState({ content: { contentFeed } });
    */

    // API.post('users/', user)
    if (token) {
      setAuthToken(token);
    } else {
      API.post('users/login', user)
        .then(res => res.data.token)
        .then(tok => setAuthToken(tok));
    }

    API.get('content/?filter=recent&start=0&max_results=30')
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then(({ featured, content_feed: contentFeed }) => this.setState(state => ({
        ...state,
        ...{ content: { featured, contentFeed } },
      })))
      .then(res => this.setState({ loading: false }));
  }

  renderCard = ({ item: { ...data } }) => (
    <ListCard {...data} callback={this.props.modalCallback} />
  );

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

// <WebView source={{ uri: this.state.currentUrl }} />
const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;
