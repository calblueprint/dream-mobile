import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    height: null,
    width: '80%',
    padding: 4,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 2,
  },
  children: {
    marginBottom: 6,
  }
});
