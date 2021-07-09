import React from 'react'
import { Text, View, Image, Button, TouchableOpacity, Dimensions } from 'react-native'
import styles from './../styles/app.style';


export default function FooterNavigation(props) {
	return (
	   <View>
	        <Button title="Plant Library"
	        onPress={() => props.nav.navigate('Plant Library')}
	       />
	      <Button title="My Plants"
	        onPress={() => props.nav.navigate('My Plants')}
	       />
	  </View>
	);
}