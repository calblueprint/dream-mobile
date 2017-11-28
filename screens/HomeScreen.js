import React from 'react';
import LocalStorage from '../helpers/LocalStorage'
import { Image, Button, Text, View } from 'react-native';
import { commonStyles } from '../styles/styles';
import { getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

class HomeScreen extends React.Component {

  componentDidMount() {
    this._fetchTeacher();
  }

  _fetchTeacher() {
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
      <View>
        <Image
          style={commonStyles.icon}
          source={require('../icons/spinner.gif')}
        />
      </View>
    );
  }
}

export default HomeScreen;
