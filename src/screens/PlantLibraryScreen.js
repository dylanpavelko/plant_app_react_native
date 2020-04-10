import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text, FlatList, Image } from 'react-native';
import styles from './../styles/app.style';
import PlantLibraryCard from './../components/PlantLibraryCard';



export default function PlantLibraryScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/plants.json')
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
   {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <PlantLibraryCard
              id={item.id} 
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