import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { withNetworkConnectivity } from 'react-native-offline';

import { HomeStack } from './config/routes';
import { configureStore } from './config/store';

const { persistor, store } = configureStore();

export default class App extends React.Component {
  render() {
    const Home = withNetworkConnectivity({
      withRedux: true,
      pingServerUrl: 'woodedoo.com'
    })(HomeStack);

    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    )
  }
}
