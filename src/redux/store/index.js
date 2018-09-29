import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';

import reducers from '../reducers';

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore({});
