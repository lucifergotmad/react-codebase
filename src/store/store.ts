import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import type { PersistConfig } from 'redux-persist';
import type { Middleware } from 'redux';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (process.env.NODE_ENV !== 'production'
    && window
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = configureStore({ reducer: persistedReducer, enhancers: [composedEnhancers] });

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
