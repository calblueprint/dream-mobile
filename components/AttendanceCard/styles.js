import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dropdownStyle: {
    width: 80,
  },
  commentButton: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    margin: 2,
    justifyContent: 'center',
  },
});
