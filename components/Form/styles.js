import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const formStyles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.backgroundWhite,
  },
  background: {
    backgroundColor: colors.backgroundWhite,
    flex: 1
  }
})

export { formStyles };
