import React from 'react';
import { Image, Button, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import { attendanceDate } from '../../lib/date';
import SearchResultCard from '../../components/SearchResultCard/SearchResultCard';
import StyledButton from '../../components/Button/Button';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import {textStyles} from "../../styles/textStyles";

class SearchStudentResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this._renderSearchResults = this._renderSearchResults.bind(this);

    this.state = {
      students: this.props.navigation.state.params.students,
      course_id: this.props.navigation.state.params.course_id,
      navbarColor: this.props.navigation.state.params.navbarColor,
    }
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfilePreview', {
      refreshStudents: this.props.navigation.state.params.refreshStudents,
      course_id: this.state.course_id,
      navbarColor: this.state.navbarColor,
      studentId: id
    });
  }

  _renderSearchResults() {
    const { navigate } = this.props.navigation;

    var students_arr = new Array();
    for (const key in this.state.students) {
      students_arr.push(this.state.students[key]);
    }

    const students = students_arr.map((student, i) => (
        <SearchResultCard key={i}
                          id={student.id}
                          student={student}
                          onSelectStudent={this._handleSelectStudent}/>
      )
    );

    if (students.length === 0) {
      return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={[textStyles.titleLarge, {
            marginTop: 64,
            textAlign: 'center'
          }]}>
            No Search Results Found. Please Go Back.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{marginBottom: 24}}>
          { students }
        </View>
      );
    }
  }

  render() {
    let results;
    if (this.props.isLoading) {
      results = (
        <Image
          style={commonStyles.icon}
          source={require('../../icons/spinner.gif')}
        />
      )
    } else {
      results = this._renderSearchResults();
    }

    return (
      <ScrollView style={{backgroundColor: '#f5f5f6'}}>
        { results }
      </ScrollView>
    );
  }
}

export default SearchStudentResultScreen;
