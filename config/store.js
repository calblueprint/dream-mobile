import { applyMiddleware, createStore, combineReducers } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import I18n from 'ex-react-native-i18n';
import Expo from 'expo';

//Expo.Util.getCurrentLocaleAsync().then((lg) => {console.log(lg)})
const curLocale = I18n.locale;
console.log("Current Locale: " + curLocale);
const reducer = combineReducers(reducers);
const initialState = { config: {isLoading: true, locale: 'en'} };

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk),
    offline(defaultConfig)
  )
);
