import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  spaceContainer:{
    flex: 0.1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },
  dropdownStyle: {
    width: 116,
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
