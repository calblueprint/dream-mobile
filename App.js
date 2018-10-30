import React from 'react';
import { Provider } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStack } from './config/routes';
import { store } from './config/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeStack />
      </Provider>
      
    )
  }
}
