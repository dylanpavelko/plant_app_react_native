import React from 'react';
import { Button, View, Text } from 'react-native';
import { setToken, getToken } from '../api/token';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
   };

  logOut = async () => {
    console.log("trying to log out")
    console.log(await getToken());
    //this.setState({ hasLoadedUsers: false, users: [] })
    await setToken('');
    console.log('logout')
    this.props.navigation.navigate('Home');
  };

 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
<Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('Home')}
   />
   <Button title="Log out" onPress={this.logOut} />
  </View>
);
}
}
export default ProfileScreen;

