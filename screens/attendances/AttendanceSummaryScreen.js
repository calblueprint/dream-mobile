import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { postRequest, putRequest } from '../../lib/requests';
import { attendanceDate } from '../../lib/date';
import Collapse from '../../components/Collapse';
import SimpleModal from '../../components/SimpleModal';

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

    return Object.keys(types).map((type, i) => {
      const studentsList = this._filterAttendances(type);
      return this._renderCollapsible(
        this._renderCollapseHeader(types[type], studentsList.length),
        this._renderStudentsList(studentsList),
        i
      );
    });
  }

  /**
    * Renders collapse header. Take in a type title, eg 'Present' and the
    * number of students with the given attendance type.
    */
  _renderCollapseHeader(typeTitle, length) {
    return (
      <View style={styles.collapseHeader}>
        <Text>{typeTitle}</Text>
        <Text>{length}</Text>
      </View>
    )
  }

  /**
    * Renders list of student names in a FlatList.
    * `students` is passed in as a list of { key: name } objects to work with
    * FlatList
    */
  _renderStudentsList(students) {
    return (
      <View>
        <FlatList
          style={styles.studentList}
          data={students}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
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
    return (
      <SimpleModal
        visible={this.state.isModalOpen}>
        <View style={{marginTop: 22}}>
          <Text>Status</Text>
          <Text>Saved to phone</Text>
          <Text>Synced</Text>
          <Text>
            Attendance not synced because the device is not connected to Wifi.
            Try again when Wifi is available. Attendance saved to phone.
          </Text>
          <Button
            onPress={() => {
              this.setState({ isModalOpen: false });
              this.props.navigation.goBack(this.props.navigation.state.params.parentKey || null);
            }}
            title='Okay'
          />
        </View>
      </SimpleModal>
    )
  }

  /**
    * Renders date, course title, attendance summary, sync button, and modal
    */
  _renderLoadedView() {
    return(
      <View>
        <ScrollView style={styles.scrollView}>
          <Text>{attendanceDate(this.state.date)}</Text>
          <Text>{this.state.courseTitle}</Text>
          {this._renderSummary()}
        </ScrollView>
        <Button
          onPress={this._syncAttendances.bind(this)}
          title="Sync"
        />
        {this._renderModal()}
      </View>
    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    // TODO (Kelsey): Add loading gif
    const view = this.state.isLoading ? (<Text>Loading...</Text>) : this._renderLoadedView();
    return (
      <View style={styles.container}>
        { view }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentList: {
    padding: 4,
  },
});
// TODO (Kelsey): Add PropTypes from navigation

export default AttendanceSummaryScreen;
