import { StyleSheet } from 'react-native';
import { textStyles } from '../../styles/textStyles';

// TODO (Kelsey): Fix styles
/**
  * Has style, backdropStyle, textStyle, optionListStyle, selectedStyle
  * See https://github.com/gs-akhan/react-native-chooser for reference.
  */
export default StyleSheet.create({
  style: {
    borderWidth: 0,
    backgroundColor: '#3BB273',
    padding: 8,
    borderRadius: 4,
  },
  optionListStyle: {
    borderRadius: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    height: 'auto',
  },
  backdropStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }, 
});
