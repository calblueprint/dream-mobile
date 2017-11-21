import React from 'react';
import { Provider } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStack } from './config/routes';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default class App extends React.Component {
  render() {
    let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

    return (
      <Provider store={store}>
        <HomeStack />
      </Provider>
    )
  }
}
