import React, { PureComponent } from 'react';
import {
  Text, View, FlatList, ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { MainCard, ListCard } from '../components/home';
import {
  API,
  setAuthToken,
  getContentForYouFirst,
  getContentForYouSecond,
} from '../services/chuneAPI';

import { colors, components, utils } from '../global';

class ForYouScreen extends PureComponent {
  state = {
    content: {
      featured: [],
      contentFeed: [],
    },
    loading: false,
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

    if (token) {
      setAuthToken(token);
    } else {
      API.post('users/login', user)
        .then(res => res.data.token)
        .then(tok => setAuthToken(tok));
    }

    // getContentForYouSecond(0, 10)
    // .then(({ featured, content_feed: contentFeed }) => this.setState(state => ({
    // ...state,
    // ...{ content: { featured, contentFeed } },
    // })))
    // .then(res => this.setState({ loading: false }))
    // .catch(err => console.log(err));
  }

  renderCard = ({ item: { ...data } }) => <ListCard {...data} />;

  handleGetData = async () => {
    this.setState({ loading: true });
    let data = await getContentForYouFirst(0, 10);
    if (
      data[Object.keys(data)[0]].length === 0
      && data[Object.keys(data)[1]].length === 0
    ) {
      data = await getContentForYouSecond(0, 10);
    }
    const { featured, content_feed: contentFeed } = data;
    this.setState(state => ({
      ...state,
      ...{ content: { featured, contentFeed } },
    }));
    this.setState({ loading: false }, () => console.log(this.state));
  };

  render() {
    const { loading, content } = this.state;
    return loading ? (
      <ActivityIndicator />
    ) : content.featured.length === 0 && content.contentFeed.length === 0 ? (
      <GetDataButton onPress={this.handleGetData}>
        <Text>get data</Text>
      </GetDataButton>
    ) : (
      <ScreenContainer>
        <ScreenScrollContainer>
          <View
            style={{
              //  other cards container
              paddingHorizontal: 8,
              paddingTop: 8,
            }}
          >
            <FlatList
              data={content.contentFeed}
              renderItem={this.renderCard}
              keyExtractor={item => item.id}
            />
          </View>
        </ScreenScrollContainer>
      </ScreenContainer>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(ForYouScreen);

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;

const GetDataButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
`;
