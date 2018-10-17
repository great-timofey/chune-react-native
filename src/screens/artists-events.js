import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { API, setAuthToken } from '../services/chuneAPI';

import { colors, components, utils } from '../global';

class ArtistsEventsScreen extends PureComponent {
  state = {
    content: {
      artists: [],
      recommended: [],
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

  renderRecommendedCard = ({ item: { image_url, name } }) => (
    <View style={{ width: 200, height: 200, justifyContent: 'flex-end' }}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        source={{ uri: image_url }}
      >
        <Text>{name}</Text>
      </ImageBackground>
    </View>
  );

  renderFollowedCard = ({ item: { image_url, name } }) => (
    <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
      <Image
        source={{ uri: image_url }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <Text>{name}</Text>
    </View>
  );

  handleGetData = async () => {
    this.setState({ loading: true });
    const response = await API.get('artists/');
    const {
      data: { artists, recommended },
    } = response;
    console.log(artists, recommended);
    this.setState(state => ({
      ...state,
      ...{ content: { artists, recommended } },
    }));
    this.setState({ loading: false }, () => console.log(this.state));
  };

  render() {
    const { loading, content } = this.state;
    return loading ? (
      <ActivityIndicator />
    ) : content.artists.length === 0 && content.recommended.length === 0 ? (
      <GetDataButton onPress={this.handleGetData}>
        <Text>get data</Text>
      </GetDataButton>
    ) : (
      <ScreenContainer>
        <ScreenScrollContainer>
          <View>
            <Text style={{ marginBottom: 10 }}>RECOMMENDED</Text>
            <FlatList
              horizontal
              data={content.recommended}
              renderItem={this.renderRecommendedCard}
              keyExtractor={item => `${item.id}`}
            />
            <Text style={{ marginBottom: 10 }}>FOLLOWED</Text>
            <FlatList
              data={content.artists}
              renderItem={this.renderFollowedCard}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </ScreenScrollContainer>
      </ScreenContainer>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(
  ArtistsEventsScreen,
);

const ScreenContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScreenScrollContainer = styled.ScrollView``;

const GetDataButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
`;
