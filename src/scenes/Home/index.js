import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spotify from 'rn-spotify-sdk';
import * as counter from '../../redux/actions/counter';
import { colors } from '../../global';
import styles from './styles';

type Props = {
  count?: Number,
  increment: Function,
  decrement: Function,
};

class Counter extends PureComponent<Props> {
  static defaultProps = {
    count: 0,
  };

  componentDidMount() {
    Spotify.getMe().then((_) => {
      // update state with user info
      Spotify.playURI('spotify:track:7kQiiHm3jvdz2npYMW7wcE', 0, 0);
    });
  }

  componentWillUnmount() {
    Spotify.setPlaying(false);
  }

  render() {
    const { count, decrement, increment } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.count}>Here goes home screen</Text>
        <Text style={styles.count}>{count}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.flatRed }]}
            onPress={() => decrement()}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.flatGreen }]}
            onPress={() => increment()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ count: state.counter.count }),
  dispatch => bindActionCreators(
    {
      decrement: counter.decrement,
      increment: counter.increment,
    },
    dispatch,
  ),
)(Counter);
