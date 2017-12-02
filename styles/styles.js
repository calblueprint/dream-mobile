import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStatic: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: '100%'
  },
  header: {
  	marginTop: 40,
  	marginBottom: 24,
  },
  icon: {
    height: 64,
    width: 64,
    marginTop: '65%',
    marginBottom: '65%',
    alignSelf: 'center',
  },
  divider: {
    borderBottomWidth: 1, 
    borderBottomColor: '#E6E6E6'
  }
});

export { commonStyles };
