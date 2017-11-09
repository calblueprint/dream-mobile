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
    width: 160,
    marginTop: 24,
    marginBottom: 8,
  },

  clearButtonSmall: {
    borderColor:'rgba(255, 255, 255, 0)',
    marginTop: 24,
    marginBottom: 8,
  },
});

export { buttonStyles };
