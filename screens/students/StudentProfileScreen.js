import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/request_callbacks';
import { formViewStyles } from '../../styles/formViewStyles';

class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);

    this.state = {
      student : { },
      isLoading : true,
      studentId: this.props.navigation.state.params.studentId,
    }
  }

  componentDidMount() {
    this._fetchStudent(this.state.studentId);
  }

  _fetchStudent(studentId) {
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ student: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentPath(studentId), successFunc, standardError);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <View style={formViewStyles.div_1}>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {this.state.student.first_name} {this.state.student.last_name}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Dream ID
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.dream_id}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Birthday
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.birthday}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>  
            <Text style={textStyles.titleSmall}>
            Year
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.year}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Address
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.address}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Nickname
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.nickname}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.primary_contact}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Relationship
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.primary_contact_relationship}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Phone
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.primary_contact_phone}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Phone 2
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.primary_contact_phone2}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let students;
    if (this.state.isLoading) {
      // TODO: Add loading gif.
      student = (
        <Text>Loading...</Text>
      )
    } else {
      student = this._renderStudent()
    }
    return (
      <ScrollView style={formViewStyles.base}>
        { student }
      </ScrollView>
    );

  }
}

export default StudentProfileScreen;
