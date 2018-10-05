import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  type: string,
  callback: Function,
  size: number,
  color: string,
};

export default ({
  type, callback, size = 24, color,
}: Props) => (
  <Icon.Button
    backgroundColor="transparent"
    name={type}
    size={size}
    color={color}
    iconStyle={{
      width: size,
      height: size,
      padding: 0,
      marginRight: 0,
    }}
    borderRadius={0}
    onPress={callback}
  />
);
