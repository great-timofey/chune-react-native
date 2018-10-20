import React, { PureComponent } from 'react';
import {
  Text, View, FlatList, ActivityIndicator,
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

import { colors, components, utils } from '../global';

class ForYouScreen extends PureComponent {
  state = {
    content: {
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
  }

  renderCard = ({ item: { ...data } }) => (
    <ListCard {...data} callback={this.props.modalCallback} />
  );

  handleGetData = async () => {
    this.setState({ loading: true });
    let data = await getContentForYouFirst(0, 10);
    if (
      data[Object.keys(data)[0]].length === 0
      && data[Object.keys(data)[1]].length === 0
    ) {
      data = await getContentForYouSecond(0, 10);
    }
    const { content_feed: contentFeed } = data;
    this.setState(state => ({
      ...state,
      ...{ content: { contentFeed } },
    }));
    this.setState({ loading: false });
  };

  render() {
    const { loading, content } = this.state;
    return loading ? (
      <ActivityIndicator />
    ) : content.contentFeed.length === 0 ? (
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
