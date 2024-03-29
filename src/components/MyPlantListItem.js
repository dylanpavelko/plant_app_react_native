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
        plant_instance_id: props.plant_instance_id,
        name: props.common_names,
        location: props.location
      })}>
        
	      <Text style={styles.plantName} >
	      <Image 
	     		style={{width:50, height: 50,}}
	     		source={props.image_url? {uri: props.image_url } : {uri: 'data:image/png;base64,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'}} />

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
    paddingLeft: 20,

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