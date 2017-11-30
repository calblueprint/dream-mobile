import { styles } from '../../styles/styles';
import colors from '../../styles/colors';
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  primaryButtonLarge: {
    backgroundColor: colors.primaryYellow,
    borderColor: colors.primaryYellow,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
  },

  primaryButtonSmall: {
    backgroundColor: colors.primaryYellow,
    borderColor: colors.primaryYellow,
    width: 104,
    height: 40,
    marginTop: 24,
    marginLeft: 8,
    marginBottom: 8,
  },

  clearButtonSmall: {
    borderColor:'rgba(255, 255, 255, 0)',
    marginBottom: 8,
  },

  secondaryButtonSmall: {
    backgroundColor: colors.dividerGrey,
    borderColor: colors.dividerGrey,
    width: 104,
    height: 40,
    marginTop: 24,
    marginLeft: 8,
    marginBottom: 8,
  },

  addSessionButton: {
    borderColor: 'transparent',
    marginTop: 24,
    marginBottom: 8,
  },
});

export { buttonStyles };
