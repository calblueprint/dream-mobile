import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStatic: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: '100%'
  },
  header: {
  	marginTop: 40, 
  	marginBottom: 24,
  }
});

export { commonStyles };
