import React from 'react';
import { Button, View, Text } from 'react-native';

export default function MyPlantsScreen({ route, navigation }) {


 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
    <Text> To Keep Track of Your Plants You Must Log In to Your Account </Text>

    <Button title="Log In / Create Account" onPress={() => navigation.navigate('Log In')} />
    <Button title="Go to User Profile"
        onPress={() => navigation.navigate('Log In')}
       />
  </View>

  
);

}