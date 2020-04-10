import React from 'react'
import { Text, View, Image, Button } from 'react-native'
import styles from './../styles/app.style';
import ScientificName from './../components/ScientificName';


export default function PlantLibraryCard(props) {
	return (
		<View>
            <Button 
               title={props.scientific_name_with_common_names}
                onPress={() => navigation.navigate('Plant Details', {
                  plant_id: props.id,
                  name: props.scientific_name_with_common_names,
                })}
            />
	        <Image 
	          style={styles.plant_image_lib_link}
	          source={{uri: props.image_url }} />
			<ScientificName name={props.scientific_name_with_common_names} />
		</View>
	);
}