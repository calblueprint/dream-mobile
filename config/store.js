import { applyMiddleware, createStore, combineReducers } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const initialState = { isLoading: {value: true} };

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk),
    offline(defaultConfig)
  )
);
