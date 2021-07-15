import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity } from 'react-native';

export default function ResourceLink(props) {

    const uri = (props.link);

    return (
      <View>
      <TouchableOpacity
        onPress={(event) => Linking.openURL(uri)} ><Text>{props.name}</Text></TouchableOpacity>
      </View>
    );

}