import { StyleSheet } from 'react-native';

// TODO (Kelsey): Fix styles
/**
  * Has style, backdropStyle, textStyle, optionListStyle, selectedStyle
  * See https://github.com/gs-akhan/react-native-chooser for reference.
  */
export default StyleSheet.create({
  style: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 4,
    margin: 4,
  },
  optionListStyle: {
    backgroundColor: 'white',
    height: 'auto',
  },
  backdropStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});
