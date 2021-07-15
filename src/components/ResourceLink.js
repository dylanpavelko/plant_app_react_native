import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResourceLink(props) {

    const uri = (props.link);

    return (
      <View style={styles.button} >
        <TouchableOpacity
          onPress={(event) => Linking.openURL(uri)} >
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