import { StyleSheet } from 'react-native';

const cardStyles = StyleSheet.create({
  outerContainer: {
  	flex: 1,
    backgroundColor: '#26A69A',
    margin: 8,
    borderRadius: 8,
  },
  topContainer: {
  	flex: 1,
  	height: 88,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
  	alignSelf: 'flex-end',  
  	height: 48,
  },
  title: {
    padding: 16,
    fontSize: 20,
  },
});

export { cardStyles };
