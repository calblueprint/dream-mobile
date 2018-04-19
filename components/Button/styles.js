import { styles } from '../../styles/styles';
import colors from '../../styles/colors';
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  primaryButtonLarge: {
    backgroundColor: colors.primaryYellow,
    borderColor: colors.primaryYellow,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
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

  whiteButtonLarge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 32, 
    marginLeft: 32,
    marginTop: 32,
    marginBottom: 24,
  },

  whiteButtonOutlineLarge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 32, 
    marginLeft: 32,
  },

  clearButtonSmall: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    width: 160,
    height: 40,
    marginRight: 8, 
    marginBottom: 8,
  },

  enrollSmall: {
    backgroundColor: colors.courseBlue,
    borderColor: colors.courseBlue,
    width: 140,
    height: 36,
  },

  linkButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  secondaryButtonLarge: {
    backgroundColor: '#CFD8DC',
    borderColor: '#CFD8DC',
    marginRight: 16,
    marginLeft: 16,
  },

  secondaryButtonOutlineLarge: {
    backgroundColor: 'transparent',
    borderColor: '#37474F',
    marginRight: 16, 
    marginLeft: 16,
  }
});

export { buttonStyles };
