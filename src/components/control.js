import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default ({ type, callback }) => (
  <Icon.Button
    backgroundColor="transparent"
    name={type}
    size={21}
    iconStyle={{
      width: 21,
      height: 21,
      padding: 0,
      marginRight: 0,
    }}
    color="#E5E0E7"
    borderRadius={0}
    onPress={callback}
  />
);
