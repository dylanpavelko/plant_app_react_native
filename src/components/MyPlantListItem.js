import React from 'react'
import { Text, View, Image, Button, TouchableOpacity, StyleSheet } from 'react-native'






export default function MyPlantListItem(props) {
	return (
		
		<View>
          		<Text key={ props.plant_id } style={styles.plantName} >
            		<ConvertEMtags name = { props.name } />
            
          </Text>
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
    marginRight: 1,
    fontSize: 18
  },
});