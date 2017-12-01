import React from 'react';
import { Button, Text, View } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { putRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import EditTeacherForm from '../../components/Form/EditTeacherForm'
import PropTypes from 'prop-types';
import LocalStorage from '../../helpers/LocalStorage'

class TeacherProfileEditScreen extends React.Component {
	constructor(props) {
	  super(props);
	}

	_handleEditTeacher(params) {
	  params.is_active = true;
	  params.id = this.props.teacher.id;

    this.props.updateTeacher(params, this.props.navigation);
	}

	render() {
		return (
			<View>
				<EditTeacherForm
				  onEditTeacher={this._handleEditTeacher.bind(this)}
				  teacher={this.props.teacher} //passing in teacher to form
				/>
			</View>
		);
	}
}

const updateTeacher = (params, navigation) => {
	return (dispatch) => {
		dispatch(actions.requestTeacher(params));
		return putRequest(
			APIRoutes.getTeacherPath(params.id),
			(responseData) => {
				dispatch(actions.receiveTeacherSuccess(responseData));
				navigation.goBack();
			},
			(error) => {
				dispatch(actions.receiveStandardError(error));
				standardError(error);
			},
			params
		);
	}
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTeacher: (params, navigation) => dispatch(updateTeacher(params, navigation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfileEditScreen);
