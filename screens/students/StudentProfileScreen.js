import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/request_callbacks';

class StudentProfileScreen extends React.Component {
  // static navigationOptions = ({navigation}) => ({
  // const { navigate } = this.props.navigation;
  //   headerRight:
  //     <Button
  //        title="Edit Profile" onPress={()=>{ navigation.navigate('EditStudentProfile'); }}
  //     />
  // });
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

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: <Button title="Edit" onPress={() => params.handleEdit()} />
    };
  };

  componentDidMount() {
    _editProfile = () => {
      this.props.navigation.navigate('EditStudentProfile',
      { refreshStudent: this._fetchStudent, student: this.state.student })
    }
    this._fetchStudent(this.state.studentId);
    this.props.navigation.setParams({ handleEdit: _editProfile });
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
    // return this.state.students.map(function(student, i) {
      return(
        <View /*key={i}*/>
          <Text>{this.state.student.id} {this.state.student.first_name} {this.state.student.last_name}</Text>

          <Text style={textStyles.titleSmall}>
          Birthday
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.birthday}
          </Text>

          <Text style={textStyles.titleSmall}>
          Year
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.year}
          </Text>

          <Text style={textStyles.titleSmall}>
          Address
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.address}
          </Text>

          <Text style={textStyles.titleSmall}>
          Nickname
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.nickname}
          </Text>

          <Text style={textStyles.titleSmall}>
          Primary Contact
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.primary_contact}
          </Text>

          <Text style={textStyles.titleSmall}>
          Primary Contact Relationship
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.primary_contact_relationship}
          </Text>

          <Text style={textStyles.titleSmall}>
          Primary Contact Phone
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.primary_contact_phone}
          </Text>

          <Text style={textStyles.titleSmall}>
          Primary Contact Phone 2
          </Text>
          <Text style={textStyles.body}>
          {this.state.student.primary_contact_phone2}
          </Text>
        </View>
      )
    // }
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
            <ScrollView>
              <View>
                { student }
              </View>
            </ScrollView>
          );

        }
      }

export default StudentProfileScreen;
