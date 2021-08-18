import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text, FlatList, Image, Dimensions, ScrollView, RefreshControl } from 'react-native';
import styles from './../styles/app.style';
import PlantLibraryCard from './../components/PlantLibraryCard';
import FooterNavigation from './../components/FooterNavigation';
import config from './../../config';




export default function PlantLibraryScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetch(config.PLANT_DB_URL_HOST+'/plants.json')
      .then((response) => response.json())
      .then((json) => {setData(json.plants);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);});
  },[]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(config.PLANT_DB_URL_HOST+'/plants.json')
      .then((response) => response.json())
      .then((json) => {setData(json.plants);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false); setRefreshing(false)});
  }, []);

 return (
  <View style={styles.library}>

   {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
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