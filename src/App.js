import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '~redux/store';
import { connected as AppNavigator } from './navigation';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar barStyle="light-content" backgroundColor="#52146C" />
      <AppNavigator />
    </PersistGate>
  </Provider>
);
