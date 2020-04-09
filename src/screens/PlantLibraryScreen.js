import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text, FlatList } from 'react-native';
import styles from './../styles/app.style.js';

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
<Button title="Go to Home screen"
    onPress={() => navigation.navigate('Home')}
   />
   <Button title="First Plant"
    onPress={() => navigation.navigate('Plant Details', {name: 'Fern'})}
   />
   <Button title="Second Plant"
    onPress={() => navigation.navigate('Plant Details', {name: 'Monstrera'})}
   />
   {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
              <Button 
                 title={item.scientific_name_with_common_names}
                  onPress={() => navigation.navigate('Plant Details', {
                    plant_id: item.id,
                    name: item.scientific_name_with_common_names,
                  })}
              />
          )}
        />
      )}
  </View>
);

}



// import React from 'react';
// import { Button, View, Text } from 'react-native';
// import styles from './../styles/app.style.js';

// export default function PlantLibraryScreen({route, navigation}){
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
  
//   useEffect(() => {
//     fetch('https://plantpavelko.herokuapp.com/plants.json')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   });
  
//   return(
//     <View style={{ flex: 1, padding: 24 }}>
//       <PlantLink name="Sheffrela" nav={navigation} />
//       <PlantLink name="Pilea" nav={navigation} />
//       <PlantLink name="Fittonia" nav={navigation} />
      
//       {isLoading ? <ActivityIndicator/> : (
//         // <ScrollView> 
//         //   <Text> { data.scientific_name_with_common_names } </Text> 
//         // </ScrollView>
//         <FlatList
//           data={data}
//           keyExtractor={({ id }, index) => id}
//           renderItem={({ item }) => (
//             <Text>{ item.scientific_name_with_common_names }</Text>
//           )}
//         />
//       )}
//     </View>
//     )
// }


