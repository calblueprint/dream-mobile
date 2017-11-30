import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../styles/styles';
import { getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';
import { connect } from 'react-redux';
import actions from '../actions';

class HomeScreen extends React.Component {
  componentDidMount() {
    this._fetchTeacher();
  }

  _fetchTeacher() {
    const { navigate } = this.props.navigation;
    if (Object.keys(this.props.teacher).length != 0) {
      navigate('Courses');
    } else {
      navigate('Login');
    }
  }

  render() {
    return (
      <Text>Loading...</Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
  };
}

export default connect(mapStateToProps)(HomeScreen);

