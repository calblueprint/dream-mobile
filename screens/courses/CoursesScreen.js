import React from 'react';
<<<<<<< 58b514217d98ba258abf14b35e8bec4a1ceefbc9
import { Button, Text, View } from 'react-native';
<<<<<<< db43e5c9b8ced305496d882b2f5267f5d491c181
import { styles } from '../../styles/styles';
=======
=======
import { Button, ScrollView, Text, View } from 'react-native';
>>>>>>> Create course screen.
import { styles } from '../../config/styles';
<<<<<<< 7ad0dbc53b80825184c8056442d8a9d52e4e173f
import { courseCardStyles } from '../../components/CourseCard';
>>>>>>> Course create fields in form.
=======
import { cardStyles } from '../../components/CourseCard/cardStyles';
>>>>>>> Adjust courses files for new directory structure.
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
        <View key={i} style={cardStyles.container}>
          <Text style={cardStyles.title}>{course.title}</Text>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    let courses;
    if (this.state.isLoading) {
      // TODO (caseytaka): Add loading gif.
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <ScrollView>
        <View>
          <Button
            onPress={() => navigate('CreateCourse', {refreshCourses: this._fetchCourses})}
            title="Create Course"
          />
          { courses }
        </View>
      </ScrollView>
    );

  }
}

export default CoursesScreen;
