import React from 'react';
import { Provider } from 'react-redux';

import store from './redux';
import Navigator from './navigation';

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
