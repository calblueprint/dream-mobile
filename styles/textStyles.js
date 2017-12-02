import { StyleSheet } from 'react-native';
import colors from './colors';

const textStyles = StyleSheet.create({
  body: {
    color: colors.textDark,
    fontSize: 18
  },

  bodyBold: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: '500'
  },

  bodySmall: {
    color: colors.textDark,
    fontSize: 14
  },

  bodySmallBold: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '500'
  },

  titleSmall: {
    color: colors.textDark_70,
    fontSize: 14
  },

  titleSmallLight: {
    color: colors.textLight,
    fontSize: 14
  },

  titleMedium: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: '700'
  },

  titleLarge: {
    color: colors.textDark,
    fontSize: 24,
    fontWeight: '700'
  },

  titleMediumLight: {
    color: colors.textLight,
    fontSize: 20,
    fontWeight: '700'
  },

  buttonText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: '500'
  },

  buttonTextYellow: {
    color: colors.primaryYellow,
    fontSize: 18,
    fontWeight: '500'
  },

  buttonTextSmall: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '500'
  },

  buttonTextSecondarySmall: {
    color: colors.textDark_30,
    fontSize: 18,
    fontWeight: '500'
  },

  toastText: {
    color: colors.textLight,
    fontSize: 18
  },

  linkText: {
    color: colors.primaryYellow,
    fontSize: 18,
    fontWeight: '500'
  },

  hintText: {
    color: colors.textDark_30,
    fontSize: 16
  },


});

export { textStyles };
