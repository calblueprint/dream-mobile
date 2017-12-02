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

  clearButtonSmall: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    width: 160,
    height: 40,
    marginRight: 8, 
    marginBottom: 8,
  },

  secondaryButtonLarge: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: '#fff',
    marginRight: 32, 
    marginLeft: 32,
  }
});

export { buttonStyles };
