import React from 'react';
import { Provider } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStack } from './config/routes'
import { createStore } from 'redux'
import rootReducer from './reducers'

export default class App extends React.Component {
  render() {
    initialState = {
      courses: {
        text: 'off',
      }
    }
    let store = createStore(rootReducer, initialState);

    return (
      <Provider store={store}>
        <HomeStack />
      </Provider>
    )
  }
}
