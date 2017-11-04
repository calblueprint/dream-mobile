import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';

/**
 * @prop onCreateCourse - callback function when course create form is submitted
 * @prop teacher - teacher object information
 */
class EditTeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: this.props.teacher,
    }
  }

  _handleFormChange(teacher){
    //formData will be a json object that will contain refs of every field
    this.setState({teacher : teacher});
  }

  _handleFormFocus(event, reactNode) {
   this.refs.scroll.scrollToFocusedInput(event, reactNode);
  }

  render() {
    return (
      <View>
        <Form
          // ref='editProfileForm'
          onChange={this._handleFormChange.bind(this)}
          // label="Personal Information"
          >
          
          <InputField
            ref='first_name'
            label='First Name'
            value={this.state.teacher.first_name}
            validationFunction=
              {[(value)=>{
                if(value == '') return "First name required";
                //Initial state is null/undefined
                if(!value) return "First name required";
                return true;
              }]}
            />

          <InputField
            ref='last_name'
            label='Last Name'
            value={this.state.teacher.last_name}/>

          <InputField
            ref='dream_id'
            label='Dream ID'
            value={this.state.teacher.dream_id}/>

          <InputField
            ref='email'
            label='Email'
            value={this.state.teacher.email}/>

          <InputField
            ref='phone'
            label='Phone Number'
            value={this.state.teacher.phone}/>

        </Form>
        <Button
          onPress={() => this.props.onEditTeacher(this.state.teacher)}
          title='Save Changes'
        />
      </View>
    );

  }
}

export default EditTeacherForm;
