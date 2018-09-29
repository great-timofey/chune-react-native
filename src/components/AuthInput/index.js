import React from 'react';
import { TextField } from 'react-native-material-textfield';

export default ({ label, password, error, validation }) => (
  <TextField
    titleTextStyle={{ alignSelf: 'flex-end' }}
    onChangeText={value => validation(value)}
    secureTextEntry={password}
    fontSize={16}
    label={label}
    labelHeight={25}
    containerStyle={{ height: 25, marginBottom: 40 }}
    baseColor="grey"
    tintColor="#7B1FA2"
    error={error}
  />
);
