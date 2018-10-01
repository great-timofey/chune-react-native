import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './redux';
import Navigator from './navigation';

export default () => (
  <Provider store={store}>
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </Fragment>
  </Provider>
);
