import React, { useEffect, useState }   from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { getMyPlants } from '../api/my_plants';
import styles from './../styles/app.style';
import MyPlantListItem from './../components/MyPlantListItem';



export default function MyPlantsScreen({ route, navigation }) {
  const [hasLoadedUsers, setLoadedUsers] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleUserLoadingError = (res) => {
    if (res.error == "401") {
      setLoadedUsers(false)
      console.log("Error 401: User Not Logged In to My Plan Screen");
    } else {
      setLoadedUsers(false)
      console.log(res)
      
    }
  }




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyPlants()
          .then((response) => response)
          .then((response) => {setData(response)})
          .then((response) => setLoadedUsers(true))
          .catch((error) => handleUserLoadingError(error))
          .finally(() => {setLoading(false);})
        }
  ,[navigation])});

  

 return (
  <View style={styles.library}>
    <ScrollView>
      {data.map((plant) => (
        <MyPlantListItem key={plant.plant_id} name = {plant.plant_name} />
      ))}
      {hasLoadedUsers? 
        <Button title="Go to My Profile" onPress={() => navigation.navigate('My Profile')} />
      
       :
       <View>
          <Text> To Keep Track of Your Plants You Must Log In to Your Account </Text>
          <Button title="Log In / Create Account" onPress={() => navigation.navigate('Log In')} />
        </View>
     }
    
    
       </ScrollView>
  </View>


);

}