import { styles } from '../../styles/styles';
import colors from '../../styles/colors';
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  primaryButtonLarge: {
    backgroundColor: colors.primaryYellow,
    color: colors.textLight,
    fontSize: 20, 
    fontWeight: '500'
  },

  primaryButtonSmall: {
  },

  clearButtonSmall: {
  },
});

export { buttonStyles };
