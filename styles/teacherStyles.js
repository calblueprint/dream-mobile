import { StyleSheet } from 'react-native';
import colors from './colors';
import styles from './styles';
import textStyles from './textStyles';

const teacherStyles = StyleSheet.create({
  base: {
		backgroundColor: colors.backgroundWhite
	}, 
  div_1: {
		marginLeft: 24,
		marginTop: 24,
	},
  div_2: {
		marginTop: 16
  }
});

export { teacherStyles };
