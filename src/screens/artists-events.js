import React, { Component } from 'react';
import {
  Button,
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

import {
  colors, components, utils, constants,
} from '../global';

type Props = {
  navigation: Object,
  showOneArtist: boolean,
  drillCallback: Function,
  token: string,
};

class ArtistsEventsScreen extends Component<Props> {
  state = {
    content: {
      artists: [],
      recommended: [],
    },
    loading: false,
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

    if (token) {
      setAuthToken(token);
    } else {
      API.post('users/login', user)
        .then(res => res.data.token)
        .then(tok => setAuthToken(tok));
    }
  }

  renderRecommendedCard = ({ item: { image_url, name, genres } }) => {
    const { drillCallback } = this.props;
    return (
      <View
        style={{
          width: 200,
          height: 200,
          marginHorizontal: 8,
        }}
      >
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
          resizeMode="cover"
          source={{ uri: image_url || constants.NO_IMAGE_ARTIST_RECOMMENDED }}
        >
          <View>
            <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
            <Text style={{ color: 'white', fontSize: 13 }}>
              {genres.map(item => item.description).join(',')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button title="ABOUT" color="white" onPress={drillCallback} />
            <Button
              title="FOLLOW"
              color="white"
              onPress={() => this.handleFollow(name)}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderFollowedCard = ({ item: { image_url, name } }) => (
    <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
      <Image
        source={{ uri: image_url || constants.NO_IMAGE_ARTIST_FOLLOWED }}
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
    this.setState(state => ({
      ...state,
      ...{ content: { artists, recommended: recommended.slice(0, 5) } },
    }));
    this.setState({ loading: false });
  };

  handleFollow = async (name) => {
    const response = await API.post(`artists/${name}/`);
    if (response.status === 200) {
      alert('Artist has been successfully added to Followed');
    } else {
      alert('Error');
    }
  };

  render() {
    const { showOneArtist } = this.props;
    const { loading, content } = this.state;
    const empty = !content.artists.length && !content.recommended.length;
    return loading ? (
      <ActivityIndicator />
    ) : empty ? (
      <GetDataButton onPress={this.handleGetData}>
        <Text>get data</Text>
      </GetDataButton>
    ) : (
      <ScreenContainer>
        {showOneArtist ? (
          <Text>you are drilled</Text>
        ) : (
          <ScreenScrollContainer>
            <View style={{ paddingTop: 24, marginBottom: 32 }}>
              <Text style={{ marginBottom: 10, paddingLeft: 16 }}>
                RECOMMENDED
              </Text>
              <FlatList
                horizontal
                data={content.recommended}
                renderItem={this.renderRecommendedCard}
                keyExtractor={item => `${item.id}`}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>FOLLOWED</Text>
              <FlatList
                data={content.artists}
                renderItem={this.renderFollowedCard}
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </ScreenScrollContainer>
        )}
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
