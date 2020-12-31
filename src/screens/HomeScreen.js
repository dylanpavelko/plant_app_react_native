import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };
   
render() {
 return (
  <View style={styles.container}>
    <Button title="Plant Library" onPress={() => this.props.navigation.navigate('Plant Library')} color="tan" />
    <Text style={styles.title} >Plant Tracker</Text>
    <Button title="My Plants" onPress={() => this.props.navigation.navigate('My Plants')} color="tan" />
  </View>
);
}
}

export default Home;