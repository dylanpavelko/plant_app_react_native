import React from 'react'
import { Text, View, Image, Button, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

import * as RootNavigation from './../utilities/RootNavigation';


export default function FooterNavigation(props) {
	return (
	   <View style={{ flexDirection:"row" }}>
	   	<TouchableOpacity 
	       	style={styles.navButtonContainerL}
	       	onPress={() => RootNavigation.navigate('Plant Library')}
	       >
	       	<Image source={require('./../../assets/library.png')} style={styles.navIcon} />
	       </TouchableOpacity>
	       <TouchableOpacity 
	       	style={styles.navButtonContainerR}
	       	onPress={() => RootNavigation.navigate('My Plants')}
	       >
	       	<Image source={require('./../../assets/myplants.png')} style={styles.navIcon} />

	       </TouchableOpacity>
	  </View>
	);
}

const styles = StyleSheet.create({
  navButtonContainerL:{
    backgroundColor: "#129840",
    width: "50%",
    marginRight: 1,
    alignItems: 'center',
  },
  navButtonContainerR:{
    backgroundColor: "#129840",
    width: "50%",
    marginLeft: 1,
    alignItems: 'center',
  },
  navIcon:{
    marginBottom: 15,
    resizeMode: 'contain',
    height: 50,
    marginTop:15
  },
});