import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../../config/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      courses : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourses();
  }

  _fetchCourses() {
    const successFunc = (responseData) => {
      this.setState({ courses: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc);
  }

  _renderCourses() {
    return this.state.courses.map(function(course, i) {
      return(
        <View key={i}>
          <Text>{course.id} {course.title}</Text>
        </View>
      );
    });
  }

  render() {
    let courses;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <View style={styles.container}>
        { courses }
      </View>
    );

  }
}

export default CoursesScreen;
