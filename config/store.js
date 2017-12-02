import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistCombineReducers, createTransform } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

import { createNetworkMiddleware } from 'react-native-offline';
// import { createTransform, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'


const config = {
  key: 'root',
  blacklist: ['isLoading', 'modal'],
  storage,
  transforms: [immutableTransform({ whitelist: ['network'] })],
}

// const networkTransform = createTransform(
//   // transform state coming from redux on its way to being serialized and stored
//   (state, key) => serializeActionQueue(state, key),
//   // transform state coming from storage, on its way to be rehydrated into redux
//   (state, key) => deserializeActionQueue(state, key),
//   // configuration options
//   { whitelist: ['network'] }
// )

// const serializeActionQueue = (state, key) => {
//   return {
//     ...state,
//     // ['actionQueue']: state.actionQueue.map((func) => { func.toString() })
//   }
// }

// const deserializeActionQueue = (state, key) => {
//   return {
//     ...state,
//     // ['actionQueue']: state.actionQueue.map((func) => { eval(func) })
//   }
// }

const reducer = persistCombineReducers(config, reducers);
const initialState = { isLoading: {value: true} };
const networkMiddleware = createNetworkMiddleware();

export const configureStore = () => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...[
      networkMiddleware,
      thunk,
    ]))
  );
  const persistor = persistStore(store);

  return { persistor, store };
}
