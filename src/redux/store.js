import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from '~redux/auth/reducer';
import authSagas from '~redux/auth/sagas';

import homeReducer from '~redux/home/reducer';
import homeSagas from '~redux/home/sagas';


const authPersistConfig = {
  key: 'auth',
  storage,
};

const homePersistConfig = {
  key: 'home',
  storage,
};


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = createStore(
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    // home: persistReducer(homePersistConfig, homeReducer),
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);

export default function configureStore() {
  // run sagas
  sagaMiddleware.run(authSagas);
  // sagaMiddleware.run(homeSagas);

  return {
    store,
    persistor,
  };
}