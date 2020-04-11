import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text, FlatList, Image, Dimensions } from 'react-native';
import styles from './../styles/app.style';
import PlantLibraryCard from './../components/PlantLibraryCard';
import config from './../../config';




export default function PlantLibraryScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.PLANT_DB_URL_HOST+'/plants.json')
      .then((response) => response.json())
      .then((json) => {setData(json.plants);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);});
  },[]);
  
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
  <Text>{ config.PLANT_DB_URL_HOST + '/plants.json'}</Text>
   {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          numColumns={3}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <PlantLibraryCard
              id={item.id.toString()} 
              scientific_name_with_common_names={item.scientific_name_with_common_names} 
              image_url={item.image_url}
              nav={navigation}
            />
          )}
        />
      )}
  </View>
);

}