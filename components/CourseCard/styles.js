import { StyleSheet } from 'react-native';

const cardStyles = StyleSheet.create({
  outerContainer: {
  	flex: 1,
    backgroundColor: '#000',
    margin: 8,
    borderRadius: 8,
  },
  topContainer: {
  	flex: 1,
  	// height: 100,
    paddingRight: 8,
    paddingBottom: 8,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
  	alignSelf: 'flex-end',  
  	height: 48,
  },
  title: {
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 20,
  },
  count: {
  	paddingLeft: 16,
    paddingTop: 8
  }
});

export { cardStyles };
