import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';

import ScientificName from './../components/ScientificName';


function PlantDetailScreen({ route, navigation }) {
  const { name } = route.params;
  return (
     
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
    <PlantHeader name={ name } />
  </View>
);
}

export default PlantDetailScreen;


function PlantHeader(props){
  return (
    <View>
      <Text>Hello, I am <ScientificName name={props.name} /></Text>
      
    </View>
  );
}