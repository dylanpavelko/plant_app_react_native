import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';

function PlantDetailScreen({ route, navigation }) {
  const { name } = route.params;
  return (
     
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
    <PlantHeader name={ JSON.stringify(name) } />
  </View>
);
}

export default PlantDetailScreen;


function PlantHeader(props){
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}