import React from 'react';
import { Image, Button, ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import Toaster, { ToastStyles } from '../../components/Toaster'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

class ToasterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

}

const mapStateToProps = (state) => {
  return {
    online: state.offline.online,
    teacher: state.teacher,
    courses: state.courses,
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: (teacherId) => dispatch(fetchCourses(teacherId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToasterScreen);
