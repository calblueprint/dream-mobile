import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../styles/styles';
import { getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      teacher: { }
    }
  }

  componentDidMount() {
    this._fetchUser();
  }

  _fetchUser() {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData, currentUser: true});
      this.props.navigation.navigate('Home');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    getRequest(APIRoutes.getCurrentUserPath(), successFunc, errorFunc);
  }

  renderLogin() {
    const { navigate } = this.props.navigation;
    return (
      <View style={commonStyles.container}>
        <Text>DREAM</Text>
        <Button
          onPress={() => navigate('Login')}
          title="Login"
        />
      </View>
    );
  }

  renderHome() {
    const { navigate } = this.props.navigation;
    return (
      <View style={commonStyles.container}>
        <Text>DREAM</Text>
        <Button
          onPress={() => navigate('Courses')}
          title="See Courses"
        />
        <Button
          onPress={() => navigate('Students')}
          title="See Students"
        />
      </View>
    );
  }

  render() {
    console.log(this.state.currentUser);
    let user = this.state.currentUser;
    if (this.state.currentUser) {
      return this.renderHome();
    } else {
      return this.renderLogin();
    }
  }
}

export default HomeScreen;
