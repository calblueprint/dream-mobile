import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { getRequest, putRequest } from '../../lib/requests';
import { commonStyles } from '../../styles/styles';
import { APIRoutes } from '../../config/routes';
import EditTeacherForm from '../../components/Form/EditTeacherForm'
import PropTypes from 'prop-types';

class TeacherProfileEditScreen extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    teacher: this.props.navigation.state.params.teacher,
	  }
	}

	_handleEditTeacher(params) {
	  params.is_active = true;

	  const successFunc = (responseData) => {
	    this.setState({ teacher: responseData});
	    this.props.navigation.state.params.refreshTeacher();
	    this.props.navigation.goBack(null);
	  }
	  const errorFunc = (error) => {
	    console.error(error);
	  }
	  putRequest(APIRoutes.getTeacherPath(this.state.teacher.id), successFunc, errorFunc, params=params);
	}

	render() {
		return (
			<View>
				<EditTeacherForm
				  onEditTeacher={this._handleEditTeacher.bind(this)} 
				  teacher={this.state.teacher} //passing in teacher to form
				/>
			</View>
		);
	}
}

export default TeacherProfileEditScreen;
