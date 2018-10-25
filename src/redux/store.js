import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './auth/reducer';
import authSagas from './auth/sagas';

import dataReducer from './data/reducer';
import dataSagas from './data/sagas';

import playerReducer from './player/reducer';
import playerSagas from './player/sagas';

import commonReducer from './common/reducer';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const blacklistTransforms = createTransform((inboundState, key) => {
  if (key === 'artistsEvents') {
    return {
      loading: null,
      overallContent: { ...inboundState.overallContent },
      currentArtist: null,
      artistContent: null,
    };
  }
  return inboundState;
});

const dataPersistConfig = {
  key: 'data',
  storage,
  transforms: [blacklistTransforms],
  whitelist: ['home', 'forYou', 'artistsEvents'],
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
    common: commonReducer,
    data: persistReducer(dataPersistConfig, dataReducer),
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);

export default function configureStore() {
  // run sagas
  sagaMiddleware.run(authSagas);
  sagaMiddleware.run(playerSagas);
  sagaMiddleware.run(dataSagas);

  return {
    store,
    persistor,
  };
}
