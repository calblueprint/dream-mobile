import React from 'react';
import { Image, Button, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { putRequestNoCatch } from '../../lib/requests';
import Collapse from '../../components/Collapse';
import SimpleModal from '../../components/SimpleModal';
import colors from '../../styles/colors';
import { standardError } from '../../lib/alerts';
import constants from '../../lib/constants';

class AttendanceSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsedList: [true, true, true, true, true],
    }

    this._toggleCollapsed = this._toggleCollapsed.bind(this)
  }

  /**
    * Filters for attendances that match the given attendance type and return a list
    * of student names in the form { key: STUDENT_NAME }
    */
  _filterAttendances(type) {
    const filteredStudents = this.props.attendances.reduce((result, attendance, i) => {
      if (attendance.attendance_type == type) {
        result.push({key: this._getStudentName(i)});
      }
      return result;
    }, []);

    return filteredStudents;
  }

  /**
    * TODO (Kelsey): consider moving this function if it's used more than twice
    * Gets students full name at the given index (assumes attendance index is same as student index)
    */
  _getStudentName(index) {
    const student = this.props.students[index]
    if (student) {
      return `${student.first_name} ${student.last_name}`
    }
  }

  /**
    * Toggles collapsible open/close for the given index
    */
  _toggleCollapsed(index) {
    const list = this.state.isCollapsedList;
    list[index] = !list[index];
    this.setState({ isCollapsedList: list });
    this.render
  }

  /**
    * Renders collapsible for each attendance type.
    */
  _renderSummary() {
    const types = {
      0: 'Present',
      1: 'Unexcused Absent',
      2: 'Excused Absent',
      3: 'Unexcused Late',
      4: 'Excused Late'
    }

    const numberColor = {
      0: colors.successGreen,
      1: colors.errorRed,
      2: colors.errorRed,
      3: colors.lateOrange,
      4: colors.lateOrange
    }

    return Object.keys(types).map((type, i) => {
      const isCollapsed = this.state.isCollapsedList[type];
      const studentsList = this._filterAttendances(type);
      return this._renderCollapsible(
        this._renderCollapseHeader(types[type], studentsList.length, numberColor[type], isCollapsed),
        this._renderStudentsList(studentsList),
        i
      );
    });
  }

  _renderIcon(isCollapsed) {
    if (isCollapsed) {
      return (
        <Image
          style={styles.icon}
          source={require('../../icons/right.png')}
        />
      )
    }
    return (
     <Image
       style={styles.icon}
       source={require('../../icons/down.png')}
     />
    )
  }

  /**
    * Renders collapse header. Take in a type title, eg 'Present' and the
    * number of students with the given attendance type.
    */
  _renderCollapseHeader(typeTitle, length, numberColor, isCollapsed) {

    return (
      <View style={styles.collapseHeader}>
        <View style={styles.containerInner}>
          {this._renderIcon(isCollapsed)}
          <Text style={textStyles.body}>{typeTitle}</Text>
        </View>
        <Text style={[textStyles.bodyBold, {color: numberColor}]}>{length}</Text>
      </View>
    )
  }

  /**
    * Renders list of student names in a FlatList.
    * `students` is passed in as a list of { key: name } objects to work with
    * FlatList
    * TODO (Kelsey): what to do about two scrollviews?
    */
  _renderStudentsList(students) {
    return (
      <View>
        <ScrollView>
        <FlatList
          style={styles.studentList}
          data={students}
          renderItem={({item}) => <Text style={textStyles.bodySmall}>{item.key}</Text>}
          removeClippedSubviews={true}
          ListEmptyComponent={<Text style={textStyles.bodySmall}>None</Text>}
        />
        </ScrollView>
      </View>
    );
  }

  /**
    * Renders collapsible at the given index, with the given header and body.
    * Collapsible state is stored as isCollapedList, which corresponds w/ each attendance type.
    */
  _renderCollapsible(header, body, i) {
    return (
      <Collapse
        key={i}
        header={header}
        setCollapsed={() => {this._toggleCollapsed(i)}}
        isCollapsed={this.state.isCollapsedList[i]}>
        {body}
      </Collapse>
    )
  }

  /**
    * Renders sync confirmation/warning modal. When dismiss is pressed,
    * modal is closed and navigates back to courses page.
    */
  _renderModal() {
    const callback = () => {
      this.props.closeModal();
      this.props.navigation.goBack(this.props.navigation.state.params.parentKey || null);
    }
    const buttons = [{ title: 'Okay', callback: callback, type: 'primary' }];
    // Indicates wheter saved to phone text should be visible
    const savedToPhoneStyle = this.props.isSynced ? { display: 'none' } : {};
    // Indicates whether synced icon should be a success or error
    const syncedIcon = this.props.isSynced ? require('../../icons/success.png') : require('../../icons/error.png');

    return (
      <SimpleModal
        onClosed={callback}
        title='Status'
        buttons={buttons}
        visible={this.props.isModalOpen}>
        <View style={styles.modalContent}>
          <View style={[styles.containerInner, {marginBottom: 8}, savedToPhoneStyle]}>
            <Image
              style={styles.statusIcon}
              source={require('../../icons/success.png')}
            />
            <Text style={textStyles.bodyBold}>Saved to phone</Text>
          </View>
          <View style={styles.containerInner}>
            <Image
              style={styles.statusIcon}
              source={syncedIcon}
            />
            <Text style={textStyles.bodyBold}>Synced</Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={textStyles.bodySmall}>
              {this.props.isSynced ? constants.attendance_synced : constants.attendance_not_synced }
            </Text>
          </View>
        </View>
      </SimpleModal>
    )
  }

  /**
    * Renders date, course title, attendance summary, sync button, and modal
    */
  _renderLoadedView() {
    return(
      <View style={commonStyles.containerStatic}>
        <ScrollView>
          <View style={styles.summaryContainer}>
            <View style={commonStyles.header}>
              <Text style={textStyles.titleSmall}>{this.props.date}</Text>
              <Text style={textStyles.titleLarge}>{this.props.courseTitle}</Text>
            </View>
            {this._renderSummary()}
          </View>
        </ScrollView>
        <StyledButton
          onPress={() => this.props.syncAttendances(
            this.props.attendances, this.props.courseId, this.props.date)}
          text='Sync'
          primaryButtonLarge
        >
        </StyledButton>
        {this._renderModal()}
      </View>
    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const view = this.props.isLoading ?
                  (<Image style={commonStyles.icon} source={require('../../icons/spinner.gif')}/>) :
                  this._renderLoadedView();
    return (
      <View style={commonStyles.containerStatic}>
        { view }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  summaryContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  studentList: {
    marginLeft: 24,
    marginBottom: 24,
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 8
  },
  statusIcon: {
    height: 24,
    width: 24,
    marginRight: 8
  },
  modalContent: {
    marginTop: 16
  }
});
// TODO (Kelsey): Add PropTypes from navigation

/**
  * Attempts to update each changed attendance and waits for each request to succeed
  * and shows different modal based on whether sync succeeded or failed. Saves attendances
  * to store regardless of success/failiure.
  */
syncAttendances = (attendances, courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAttendances(courseId, date));
    const attendancePromises = attendances.map((attendance, i) => {
      return updateAttendance(attendance, i);
    });

    Promise.all(attendancePromises).then((responseData) => {
      dispatch(actions.receiveUpdateAttendancesSuccess(responseData, courseId, date));
      dispatch(actions.openModal());
    }).catch((error) => {
      dispatch(actions.receiveUpdateAttendancesError(attendances, courseId, date));
      dispatch(actions.openModal());
    });
  }
}

/**
  * Makes put request to update given attendance if it has been changed
  * (Uses putRequestNoCatch so any errors get caught in Promise.all)
  */
updateAttendance = (attendance, index) => {
  const successFunc = (responseData) => {
    return responseData;
  }
  const errorFunc = (error) => {
    console.log(error);
  }
  const params = attendance

  if (attendance.isChanged) {
    return putRequestNoCatch(APIRoutes.attendancePath(), successFunc, errorFunc, params);
  } else {
    return attendance;
  }
}

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
  const date = props.navigation.state.params.date;
  return {
    ...props.navigation.state.params,
    isLoading: state.isLoading.value,
    isSynced: course.attendances[date].isSynced,
    isModalOpen: state.modal.isOpen,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncAttendances: (attendances, courseId, date) => dispatch(syncAttendances(attendances, courseId, date)),
    closeModal: () => dispatch(actions.closeModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceSummaryScreen);
