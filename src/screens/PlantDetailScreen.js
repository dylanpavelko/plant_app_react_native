import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text,  } from 'react-native';

import config from './../../config';
import styles from './../styles/app.style.js';
import ScientificName from './../components/ScientificName';


function PlantDetailScreen({ route, navigation }) {
  const { name } = route.params;
  var { plant_id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.PLANT_DB_URL_HOST+'/plants/'+plant_id+'.json')
      .then((response) => response.json())
      .then((json) => {setData(json);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);});
  },[]);

  return (
     
  <View style={{ 
   flex: 1,
   justifyContent:'center'
  }}>
       {isLoading ? <ActivityIndicator/> : (
        <PlantHeader name={ data.scientific_name_with_common_names } />
      )}
  </View>
);
}

export default PlantDetailScreen;


function PlantHeader(props){
  return (
    <View>
      <Text><ScientificName name={props.name} /></Text>
      
    </View>
  );
}