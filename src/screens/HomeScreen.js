import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';
import { getUsers } from '../api/users';
import { getMyPlants } from '../api/my_plants';

import { setToken, getToken } from '../api/token';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };

  state = { users: [], hasLoadedUsers: false, userLoadingErrorMessage: '' };

  loadUsers() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' });
    getMyPlants()
      .then((users) =>
        this.setState({
          hasLoadedUsers: true,
          users,
        }),
      )
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.error === 401) {
      console.log("Error 401");
     //this.props.navigation.navigate('Log In');
     this.setState({
        hasLoadedUsers: false,
      });
    } else {
      this.setState({
        hasLoadedUsers: false,
        userLoadingErrorMessage: res.message,
      });
    }
  }

  componentDidMount() {
    console.log("mount")
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      () => {
        if (!this.state.hasLoadedUsers) {
          this.loadUsers();
        }
      },
    );
  }

  componentWillUnmount() {
    //this.didFocusSubscription.remove();
    this._unsubscribe();
    console.log("unmount")
  }

  logOut = async () => {
    console.log(await getToken());
    this.setState({ hasLoadedUsers: false, users: [] })
    await setToken('');
    console.log('logout')
    this.props.navigation.navigate('Home');
  };

render() {
  const { users, userLoadingErrorMessage } = this.state;


 return (
  <View style={styles.container}>
    <Button title="Plant Library" onPress={() => this.props.navigation.navigate('Plant Library')} color="tan" />
    <Text style={styles.title} >Plant Tracker</Text>
    <Button title="My Plants" onPress={() => this.props.navigation.navigate('My Plants')} color="tan" />

    {this.state.users.map((user) => (
      <Text key={user.plant_id}>{user.plant_id}</Text>
    ))}
    {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
    ) : null}

    {
      (getToken !== null)? 
      (<Button title="Log out" onPress={this.logOut} />) : null
    }


  </View>
);
}
}
