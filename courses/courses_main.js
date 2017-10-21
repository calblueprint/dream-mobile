import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class CoursesScreen extends React.Component {

  static navigationOptions = {
    title: 'Courses',
  };

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
    // TODO (caseytaka): Fix URL
    fetch('http://127.0.0.1:3000/api/courses', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        this.setState({ courses: responseData, isLoading: false });
      }.bind(this))
      .catch(function(error) {
        // TODO (caseytaka): Display correct toastr error msg
        console.error(error);
      });
  }

  _handleCreateCourse() {
    console.log("HERE!!!");
    // console.log(this.state.courseData);
  }

  _renderCourses() {
    return this.state.courses.map(function(course, i) {
      return(
        <View key={i} style={courseCard.container}>
          <Text style={courseCard.title}>{course.title}</Text>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;

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
      <View>
        <Button
          onPress={() =>
            navigate(
              'CreateCourse',
              // {onCreateCourse: {this._handleCreateCourse}.bind(this)}
            )}
          title="Create Course"
        />
        { courses }
      </View>
    );

  }
}

const courseCard = StyleSheet.create({
  container: {
    backgroundColor: '#A1C3BB',
    margin: 8,
    height: 110,
  },
  title: {
    padding: 16,
    fontSize: 20,
  },
});


