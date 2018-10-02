import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spotify from 'rn-spotify-sdk';
import * as counter from '../../ducks/counter';
import { colors } from '../../global';
import styles from './styles';

type Props = {
  count?: Number,
  increment: Function,
  decrement: Function,
};

const SmallCard = () => (
  <View
    style={{
      width: '100%',
      backgroundColor: 'red',
      flexDirection: 'row',
      marginBottom: 8,
    }}
  >
    <View
      style={{
        width: width * 0.27,
        justifyContent: 'flex-end',
        backgroundColor: 'black',
      }}
    >
      <Text style={{ color: 'white' }}>Picture</Text>
    </View>
    <View
      style={{
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: 'white',
      }}
    >
      <Text
        style={{
          color: '#210130',
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          marginBottom: 5,
        }}
      >
        Internet Banner Advertising
      </Text>
      <Text
        style={{
          color: '#86758E',
          fontSize: 13,
          fontFamily: 'Roboto-Regular',
          marginBottom: 5,
        }}
      >
        What Makes Flyers Untivaled
      </Text>
      <Text
        style={{
          color: '#86758E',
          fontSize: 13,
          fontFamily: 'Roboto-Regular',
          marginBottom: 10,
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
        <Text style={{ color: '#86758E' }}>VIA YOUREDM</Text>
        <Text style={{ color: '#86758E' }}>22 SEP, 2016</Text>
        <Text style={{ color: '#86758E' }}>Drake</Text>
      </View>
    </View>
  </View>
);

const { width, height } = Dimensions.get('window');

class Counter extends PureComponent<Props> {
  static defaultProps = {
    count: 0,
  };

  componentDidMount() {
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
          <SmallCard />
          <SmallCard />
        </View>
      </ScrollView>
      // <View style={styles.container}>
      // <Text style={(styles.count, { fontFamily: 'Roboto-Bold' })}>
      // Here goes home screen
      // </Text>
      // <Text style={styles.count}>{count}</Text>
      // <View style={styles.buttonsContainer}>
      // <TouchableOpacity
      // style={[styles.button, { backgroundColor: colors.flatRed }]}
      // onPress={() => decrement()}
      // >
      // <Text style={styles.buttonText}>-</Text>
      // </TouchableOpacity>
      // <TouchableOpacity
      // style={[styles.button, { backgroundColor: colors.flatGreen }]}
      // onPress={() => increment()}
      // >
      // <Text style={styles.buttonText}>+</Text>
      // </TouchableOpacity>
      // </View>
      // </View>
    );
  }
}

export default connect(
  state => ({ count: state.counter.count }),
  dispatch => bindActionCreators(
    { decrement: counter.decrement, increment: counter.increment },
    dispatch,
  ),
)(Counter);
