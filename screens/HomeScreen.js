import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles/styles';

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>DREAM</Text>
        <Button
          onPress={() => navigate('Courses')}
          title="See Courses"
        />
      </View>
    );
  }
}

export default HomeScreen;
