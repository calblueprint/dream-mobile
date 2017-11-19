import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    height: null,
    width: '90%',
    padding: 16,
    paddingBottom: 0, 
    borderRadius: 4,
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
    marginLeft: 8,
  },
  children: {
    marginBottom: 6,
  }
});
