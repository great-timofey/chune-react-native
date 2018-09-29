import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type Props = {
  navigation: Object
}

function Home(props: Props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Counter')}>
        <Text style={styles.buttonText}>Redux Counter</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Home;
