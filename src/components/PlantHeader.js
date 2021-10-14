import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PlantHeader(props){
  return (
    <View>
      <Text style={{fontSize: 20}}>
        <Text style={{fontStyle: 'italic'}}>{props.plant.genus? props.plant.genus.name : ''} {props.plant.species? props.plant.species.name.toLowerCase() : ''} </Text>
        <VarietyHeader variety={props.plant.variety} />
        <CultivatorHeader cultivator={props.plant.cultivator} />
      </Text>
      <Text style={{fontSize: 15}}>
          {props.plant.common_names? props.plant.common_names.map((name, index) => {
            var commas = "";
            if((props.plant.common_names.length) > (index+1)){
              commas = ", ";
            }
            return (
              <Text key={name.id}>{name.name}{commas}</Text>
            )
          }) : ''}
      </Text>
      <Text></Text>
      
    </View>
  );
}