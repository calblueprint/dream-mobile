import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class ViewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourse();
  }

  _fetchCourse() {
    const course_id = this.props.navigation.state.params.course_id;
    const successFunc = (responseData) => {
      this.setState({ course: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getCoursePath(course_id), successFunc, errorFunc);
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      // TODO (caseytaka): Add loading gif.
      return (
        <Text>Loading...</Text>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text>{ this.state.course.title }</Text>
            <Button
              onPress={() => navigate('EditCourse',
                {
                  refreshCourse: this._fetchCourse,
                  newCourse: false,
                  is_active: this.state.course.is_active,
                  title: this.state.course.title,
                  teacher1: this.state.course.teacher_id1,
                  teacher2: this.state.course.teacher_id2,
                  weekday: this.state.course.weekday,
                  start_time: this.state.course.start_time,
                  end_time: this.state.course.end_time,
                  start_date: this.state.course.start_date,
                  end_date: this.state.course.end_date,
                })}
              title="Edit Course"
            />
          </View>
        </ScrollView>
      );
    }
  }
}

export default ViewCourseScreen;
