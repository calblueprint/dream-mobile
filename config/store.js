import storage from 'redux-persist/lib/storage'
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const config = {
  key: 'root',
  blacklist: ['isLoading'],
  storage,
}

const reducer = persistCombineReducers(config, reducers)
const initialState = { isLoading: {value: true} }

export const configureStore = () => {
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { persistor, store };
}
