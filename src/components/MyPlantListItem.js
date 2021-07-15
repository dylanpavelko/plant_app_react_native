import React, { useState } from 'react'
import { Text, View, Image, Button, CheckBox, TouchableOpacity, StyleSheet } from 'react-native'






export default function MyPlantListItem(props) {
	const [isSelected, setSelection] = useState(false);

	return (
		<View>
			<TouchableOpacity
				style={ styles.row }
		    onPress={() => props.nav.navigate('Growth Details', {
        plant_id: props.plant_id,
        name: props.common_names,
        location: props.location
      })}>
	      <Text style={styles.plantName} >
	        <ConvertEMtags name = { props.name } /> 
	      </Text>
	      <Text style={{alignItems:'center'}}>></Text>
	    </TouchableOpacity>
      <View style = { styles.lineStyle } />
    </View>
	);
}


function ConvertEMtags(props) {
	var name_parts = props.name.split(/<em>|<\/em>/);
	return (
			<Text>
				{name_parts.map((string, index) => 
					{if(index % 2 === 1)	
						return (<Text style={styles.italic} key={index.toString()}>{string}</Text>)	
					return <Text key={index.toString()}>{string}</Text>
				}
				)}
			</Text>	
	)
}

const styles = StyleSheet.create({
  plantName:{
    paddingLeft: 60,
    padding: 5,
    fontSize: 18,
  },
  italic:{
  	fontStyle: 'italic',
  },
  lineStyle:{
  	borderWidth: 0.5,
  	borderColor: 'black',
  	margin: 10,
  },
  checkBox:{
  	alignSelf: "center",
  },
  row:{
  	paddingRight:20,
  	flexDirection:'row',
  	justifyContent:'space-between',
  	alignItems:'center'
  }
});