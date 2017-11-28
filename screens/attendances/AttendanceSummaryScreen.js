import React from 'react';
import { Image, Button, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { postRequest, putRequest } from '../../lib/requests';
import { attendanceDate } from '../../lib/date';
import Collapse from '../../components/Collapse';
import SimpleModal from '../../components/SimpleModal';
import colors from '../../styles/colors';

class AttendanceSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      attendances: params.attendances,
      students: params.students,
      date: params.date,
      courseTitle: params.courseTitle,
      isLoading: false,
      isCollapsedList: [true, true, true, true, true],
      isModalOpen: false,
    }

    this._toggleCollapsed = this._toggleCollapsed.bind(this)
  }

  /**
    * Filters for attendances that match the given attendance type and return a list
    * of student names in the form { key: STUDENT_NAME }
    */
  _filterAttendances(type) {
    const filteredStudents = this.state.attendances.reduce((result, attendance, i) => {
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
    const student = this.state.students[index]
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
    * TODO (Kelsey): have this save locally too and indicate success for saving locally/network
    * Attempts to update each changed attendance and waits for each request to succeed
    * before navigating backwards or logging failure
    */
  _syncAttendances() {
    this.setState({ isLoading: true });

    const attendances = this.state.attendances.map((attendance, i) => {
      return this._updateAttendance(attendance, i);
    });

    Promise.all(attendances).then((attendances) => {
      this.setState({ isLoading: false, isModalOpen: true })
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
    * Makes put request to update given attendance if it has been changed
    */
  _updateAttendance(attendance, index) {
    const successFunc = (responseData) => {
      return responseData;
    }
    const errorFunc = (error) => {
      // TODO (Kelsey): address what happens when editing attendance fails
      console.log(error);
    }
    const params = attendance

    if (attendance.isChanged) {
      return putRequest(APIRoutes.attendancePath(), successFunc, errorFunc, params);
    }
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
      this.setState({ isModalOpen: false });
      this.props.navigation.goBack(this.props.navigation.state.params.parentKey || null);
    }
    const buttons = [{ title: 'Okay', callback: callback, type: 'primary' }]

    return (
      <SimpleModal
        onClosed={callback}
        title='Status'
        buttons={buttons}
        visible={this.state.isModalOpen}>
        <View style={styles.modalContent}>
          <View style={[styles.containerInner, {marginBottom: 8}]}>
            <Image
              style={styles.statusIcon}
              source={require('../../icons/success.png')}
            />
            <Text style={textStyles.bodyBold}>Saved to phone</Text>
          </View>
          <View style={styles.containerInner}>
            <Image
              style={styles.statusIcon}
              source={require('../../icons/error.png')}
            />
            <Text style={textStyles.bodyBold}>Synced</Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={textStyles.bodySmall}>
              Attendance not synced because the device is not connected to Wifi.
              Try again when Wifi is available. Attendance saved to phone.
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
              <Text style={textStyles.titleSmall}>{attendanceDate(this.state.date)}</Text>
              <Text style={textStyles.titleLarge}>{this.state.courseTitle}</Text>
            </View>
            {this._renderSummary()}
          </View>
        </ScrollView>
        <StyledButton
          onPress={this._syncAttendances.bind(this)}
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
    // TODO (Kelsey): Add loading gif
    const view = this.state.isLoading ?
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

export default AttendanceSummaryScreen;
