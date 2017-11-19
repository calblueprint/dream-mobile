import React from 'react';
import LocalStorage from '../helpers/LocalStorage'
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../styles/styles';
import { getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

class HomeScreen extends React.Component {

  componentDidMount() {
    // LocalStorage.clearUser();
    this._fetchUser();
  }

  _fetchUser() {
    const { navigate } = this.props.navigation;
    setTimeout(() => {
      LocalStorage.getUser().then((user) => {
        navigate('Courses');
      }).catch((error) => {
        navigate('Login');
      });
    }, 2000);
  }

  render() {
    return (
      <Text>Loading...</Text>
    );
  }
}

export default HomeScreen;
