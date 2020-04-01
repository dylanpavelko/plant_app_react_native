import React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './../styles/app.style.js';

class PlantLibraryScreen extends React.Component {
  static navigationOptions = {
    title: 'Plant Library'
   };
 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
<Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('Home')}
   />
   <Button title="First Plant"
    onPress={() => this.props.navigation.navigate('Plant Details', {name: 'Fern'})}
   />
   <Button title="Second Plant"
    onPress={() => this.props.navigation.navigate('Plant Details', {name: 'Monstrera'})}
   />
  </View>
);
}
}
export default PlantLibraryScreen;


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