import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddPlantInstanceButton(props) {

    const navigation = useNavigation();

    return (
      <View style={styles.button} >
        <TouchableOpacity
          	onPress={() => navigation.navigate('Add Plant Instance', {
	        plant_id: props.plant_id,
	        name: props.name,
	        location: props.location
	      })} >
          <View>
          <Text style={{color:'white'}}>{props.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:"#18cd58",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    margin: 5,
    padding: 10,
    
  },
});