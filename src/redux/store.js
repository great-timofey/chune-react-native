import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './auth/reducer';
import authSagas from './auth/sagas';

import homeReducer from './home/reducer';
import homeSagas from './home/sagas';

import playerReducer from './player/reducer';
import playerSagas from './player/sagas';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const homePersistConfig = {
  key: 'home',
  storage,
};

const playerPersistConfig = {
  key: 'player',
  storage,
  whitelist: ['tracksTypes'],
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = createStore(
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    player: persistReducer(playerPersistConfig, playerReducer),
    // home: persistReducer(homePersistConfig, homeReducer),
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);

export default function configureStore() {
  // run sagas
  sagaMiddleware.run(authSagas);
  sagaMiddleware.run(playerSagas);
  // sagaMiddleware.run(homeSagas);

  return {
    store,
    persistor,
  };
}
