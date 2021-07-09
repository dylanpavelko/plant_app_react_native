import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';
import { getUsers } from '../api/mock';
import { setToken, getToken } from '../api/token';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };

  state = { users: [], hasLoadedUsers: false, userLoadingErrorMessage: '' };

  loadUsers() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' });
    getUsers()
      .then((res) =>
        this.setState({
          hasLoadedUsers: true,
          users: res.users,
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
        console.log("test");
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
      <Text key={user.email}>{user.email}</Text>
    ))}
    {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
    ) : null}

    {(this.state.users.length > 0)? (<Button title="Log out" onPress={this.logOut} />) : null}

  </View>
);
}
}
