import React, {useState} from 'react'
import { Text, View, Image, Button, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

import * as RootNavigation from './../utilities/RootNavigation';
import GLOBAL from './../global.js'


export default function FooterNavigation(props) {

	

	return (
		<View>
		 {GLOBAL.addable && <Image source={require('./../../assets/add.png')} style={styles.addIcon} />}
	   <View style={{ flexDirection:"row", backgroundColor: '#c4e5cf' }}>
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

	  	

	  </View>
	);
}

const styles = StyleSheet.create({
  navButtonContainerL:{
    backgroundColor: "#129840",
    width: "50%",
    marginRight: 1,
    paddingRight: 10,
    alignItems: 'center',
  },
  navButtonContainerR:{
    backgroundColor: "#129840",
    width: "50%",
    marginLeft: 1,
    paddingLeft:20,
    alignItems: 'center',
  },
  navIcon:{
    marginBottom: 15,
    resizeMode: 'contain',
    height: 50,
    marginTop:15
  },
  addButton:{
  	
  },
  addIcon:{
  	zIndex: 10,
  	position:'absolute',
  	justifyContent:'center',
  	alignItems:"center",
  	top:-10,
  	left:'38.75%',
  	height:100,
  	width:100,
  }
});