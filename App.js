import React from 'react';
import { Provider } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStack } from './config/routes';
import { PersistGate } from 'redux-persist/es/integration/react';
import { configureStore } from './config/store';

const { persistor, store } = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <HomeStack />
        </PersistGate>
      </Provider>
    )
  }
}
