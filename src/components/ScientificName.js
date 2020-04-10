import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './../styles/app.style';


function ConvertEMtags(props) {
	var name_parts = props.name.split(/<em>|<\/em>/);
	return (
		<View>
		<Text>
			{name_parts.map((string, index) => 
				{if(index % 2 === 1)	
					return <Text style={styles.italic}>{string}</Text>	
				return <Text>{string}</Text>
			}
			)}
		</Text>
		</View>
				
			
			
	)
}

export default function ScientificName(props) {
	return (
		<View>
			< ConvertEMtags name={props.name} />
		</View>
	);
}


