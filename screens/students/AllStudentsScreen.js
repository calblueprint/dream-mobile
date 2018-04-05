import React from 'react';
import { Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/datetime_formats';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import StudentCard from '../../components/StudentCard/StudentCard';
import { formViewStyles } from '../../styles/formViewStyles';
import { textStyles } from '../../styles/textStyles';
import { FontAwesome,Entypo } from '@expo/vector-icons';
import colors from '../../styles/colors';



class AllStudentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchAllStudents = this._fetchAllStudents.bind(this);
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this.state = {
      course_id : this.props.navigation.state.params.course_id,
      sessions: [],
      course : { },
      isLoading : true,
      students: [],
    }
  }

  componentDidMount() {
    this._fetchAllStudents();
  }

  /*
   * Fetch all students.
   */
  _fetchAllStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }

    getRequest(APIRoutes.getStudentsPath(), successFunc, standardError);
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfilePreview', {
      refreshStudents: this.props.navigation.state.params.refreshStudents,
      course_id: this.state.course_id,
      studentId: id
    });
  }

  /*
   * Display students.
   */
  _renderStudents() {
    const { navigate } = this.props.navigation;
    return this.state.students.map((student, i) =>  (
      <StudentCard key={i}
        student={student}
        onSelectStudent={this._handleSelectStudent}
      />
      )
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={commonStyles.containerStatic}>
          <Image
            style={commonStyles.icon}
            source={require('../../icons/spinner.gif')}
          />
      </View>
      );
    } else {
      return (
        <ScrollView style={formViewStyles.base}>
          <View style={[formViewStyles.div_1, {marginBottom: 16}]}>
              <View style={{marginTop: 8}}>
              { this._renderStudents() }
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const viewStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingLeft: 16,
  },
});

export default AllStudentsScreen;
