import React from 'react';
import { Image, Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequestNoCatch } from '../../lib/requests';
import AttendanceDateCard from '../../components/AttendanceDateCard/AttendanceDateCard';
import SimpleModal from '../../components/SimpleModal';
import { standardError } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';

class RecentAttendancesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectDate = this._handleSelectDate.bind(this);
  }

  /**
    * Method passed to DateCard to open attendance screen for attendance with given date.
    */
    _handleSelectDate(date) {
      var course = this.props.navigation.state.params.course
      this.props.navigation.navigate('Attendances', {
        courseId: course.id,
        courseTitle: course.title,
        date: date,
      });
    }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    //TODO: (Aivant) ensure that this only renders 5
    return Object.keys(this.props.attendances).map((date, i) => {
      return(
        <AttendanceDateCard key={i}
          date={date}
          onSelectDate={(date) => {this._handleSelectDate(date)}}
          />
      );
    });
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    const { navigate } = this.props.navigation;

    return(
      <View>
        <StyledButton
          onPress={() => navigate('PastAttendances',
            { courseId: this.props.courseId,
            })}
          text="View By Month"
          primaryButtonLarge
        />
      <Text style={textStyles.titleLarge}>"Hello World!"</Text>
    </View>

    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const attendances = this._renderLoadedView();
    return (
      <View style={commonStyles.containerStatic}>
        { attendances }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Either change styles or generalize to AttendanceSummaryScreen too
  attendancesContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
});
// TODO (Kelsey): Add PropTypes from navigation


const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  //TODO: (Aivant) This is honestly atrocious please fix when we make ViewCourseScreen offline!
  const course = state.courses.find((course) => course.id === props.navigation.state.params.course.id);
  return {
    ...props.navigation.state.params,
    attendances: course.attendances ? course.attendances : {},
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentAttendancesScreen);
