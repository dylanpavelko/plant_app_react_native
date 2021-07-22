import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddObservationButton(props) {

    const navigation = useNavigation();

    return (
      <View style={{alignItems:"center"}}>
      <View style={styles.button} >
        <TouchableOpacity
          	onPress={() => navigation.navigate('Add Observation', {
	        plant_id: props.plant_id,
	        plant_instance_id: props.plant_instance_id,
          plant_stages: props.plant_stages,
	      })} >
          <View>
          <Text style={{color:'white'}}>Add Observation</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    width: '80%',
    
  },
});