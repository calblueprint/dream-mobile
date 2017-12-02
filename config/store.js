import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistCombineReducers } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

import { createNetworkMiddleware } from 'react-native-offline';

const config = {
  key: 'root',
  blacklist: ['isLoading', 'modal'],
  storage,
}

const reducer = persistCombineReducers(config, reducers);
const initialState = { isLoading: {value: true} };
const networkMiddleware = createNetworkMiddleware();

export const configureStore = () => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(networkMiddleware, thunk))
  );
  const persistor = persistStore(store);

  return { persistor, store };
}
