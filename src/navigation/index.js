import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../scenes/Home';
import Counter from '../scenes/Counter';

export const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Counter: {
    path: 'counter',
    screen: Counter,
  },
});
export default function Navigator() {
  return (
    <AppNavigator />
  );
}
