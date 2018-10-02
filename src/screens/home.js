import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spotify from 'rn-spotify-sdk';
import * as counter from '../ducks/counter';
import { colors } from '../global';
import { API, setUserToken } from '../services/chune-api';

type Props = {
  count?: Number,
  increment: Function,
  decrement: Function,
};

const SmallCard = (key, title, sourceName, artistName, image) => (
  <View
    key={key}
    style={{
      width: '100%',
      height: 100,
      backgroundColor: 'red',
      flexDirection: 'row',
      marginBottom: 12,
    }}
  >
    <Image
      resizeMode="cover"
      style={{
        width: 100,
        height: 100,
      }}
      source={{
        uri: `https://chunesupply.s3.amazonaws.com/imgs/${image}`,
      }}
    />
    <View
      style={{
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: 'white',
      }}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          color: '#210130',
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          marginBottom: 3,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#86758E',
          fontSize: 13,
          fontFamily: 'Roboto-Regular',
        }}
      >
        What Makes Flyers Untivaled
      </Text>
      <Text
        style={{
          color: '#86758E',
          fontSize: 13,
          fontFamily: 'Roboto-Regular',
          marginBottom: 3,
        }}
      >
        dewd
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: '#86758E' }}>{sourceName}</Text>
        <Text style={{ color: '#86758E' }}>22 SEP</Text>
        <Text style={{ color: '#86758E' }}>{artistName}</Text>
      </View>
    </View>
  </View>
);

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends PureComponent<Props> {
  static defaultProps = {
    count: 0,
  };

  state = {
    data: [],
  };

  componentDidMount() {
    // const name = 'tim';
    const email = 'tim@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    API.post('users/login', user)
      .then(res => res.data.token)
      .then(token => setUserToken(token))
      .then(_ => API.get('content/?filter=recent&start=0&max_results=10'))
      .then(res => res.data.content_feed)
      .then(data => this.setState({ data }))
      .then(_ => console.log(this.state.data))
      .catch(err => console.log(err.response));
    // Spotify.getMe().then((_) => {
    // update state with user info
    // Spotify.playURI('spotify:track:7kQiiHm3jvdz2npYMW7wcE', 0, 0);
    // });
  }

  // componentWillUnmount() {
  // Spotify.setPlaying(false);
  // }

  render() {
    // const { count, decrement, increment } = this.props;
    return (
      <ScrollView>
        <View
          style={{
            //  main card
            width: '100%',
            height: Dimensions.get('window').height * 0.43,
          }}
        >
          <View
            style={{
              //  main card text container
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: 'red',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                //  main card header
                color: 'white',
                fontFamily: 'Roboto-Regular',
                fontSize: 24,
                marginBottom: 5,
              }}
            >
              Influencing The Influencer
            </Text>
            <Text
              style={{
                //  main card preview
                width: '50%',
                color: 'white',
                fontFamily: 'Roboto-Regular',
                marginBottom: 15,
                fontSize: 13,
              }}
            >
              Nail It On The Head With Free Internet Advertising
            </Text>
            <TouchableOpacity
              style={{
                //  main card read more button
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto-Medium',
                  textTransform: 'uppercase',
                }}
              >
                Read More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              height: Dimensions.get('window').height * 0.295,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 8,
            }}
          >
            <View
              style={{
                //  other cards big card
                backgroundColor: 'green',
                width: Dimensions.get('window').width * 0.47,
                justifyContent: 'flex-end',
                paddingHorizontal: 8,
                paddingBottom: 8,
              }}
            >
              <View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={{
                    // other cards big card header
                    color: 'white',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Getting Free Publicity For Your Business Getting Free
                  Publicity For Your Business
                </Text>
                <Text
                  style={{
                    //  other cards big card preview
                    color: 'white',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 11,
                  }}
                >
                  Getting Free Publicity For Your Business
                </Text>
              </View>
            </View>
            <View
              style={{
                //  other cards big card
                backgroundColor: 'black',
                width: Dimensions.get('window').width * 0.47,
                justifyContent: 'flex-end',
                paddingHorizontal: 8,
                paddingBottom: 14,
              }}
            >
              <View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={{
                    // other cards big card header
                    color: 'white',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Getting Free Publicity For Your Business
                </Text>
                <Text
                  style={{
                    //  other cards big card preview
                    color: 'white',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 11,
                  }}
                >
                  Getting Free Publicity For Your Business
                </Text>
              </View>
            </View>
          </View>
          {!!this.state.data.length
            && this.state.data.map(
              item => item.type == 'article'
                && SmallCard(
                  item.id,
                  item.title,
                  item.source_name,
                  item.artist_name,
                  item.image,
                ),
            )}
        </View>
      </ScrollView>
    );
  }
}