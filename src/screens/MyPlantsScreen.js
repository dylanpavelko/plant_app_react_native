import React, { useEffect, useState }   from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { getMyPlants } from '../api/my_plants';
import styles from './../styles/app.style';




export default function MyPlantsScreen({ route, navigation }) {
  const state = { plants: [], hasLoadedPlants: false, plantsLoadingErrorMessage: '' };
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    getMyPlants()
        .then((response) => response)
        .then((response) => {setData(response)})
        .then((response) => console.log(data))
        .catch((error) => console.error(error))
        .finally(() => {setLoading(false);});

  },[]);

 return (
  <View style={styles.library}>
    <ScrollView>
    <Text> To Keep Track of Your Plants You Must Log In to Your Account </Text>
        {data.map((plant) => (
          <View>
          <Text key={plant.plant_id}>
            <ConvertEMtags name = {plant.plant_name} />
            }
          </Text>
          </View>
    ))}
    <Button title="Log In / Create Account" onPress={() => navigation.navigate('Log In')} />
    <Button title="Go to User Profile"
        onPress={() => navigation.navigate('Log In')}
       />
       </ScrollView>
  </View>


);

}


function ConvertEMtags(props) {
  console.log(props)
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