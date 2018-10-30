import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    flex: 0.5,
  },
  spaceContainer:{
    flex: 0.01,
  },
  leftOuterContainer: {
    flex: 0.49,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  attendanceButton: {
    width: 100,
    height: 40,
  },
  attendanceContainer: {
    width: 100,
    height: 40,
  },
  commentButton: {
    width: 32, 
    height: 31,
  },
  commentButtonOuter: {
    marginLeft: 16,
  },
});
