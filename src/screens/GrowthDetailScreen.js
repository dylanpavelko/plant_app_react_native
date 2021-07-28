import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, ScrollView, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import Carousel from './../components/Carousel';
import config from './../../config';
import styles from './../styles/app.style.js';
import { getPlantInstance } from '../api/my_plants';
import AddObservationButton from './../components/ObservationButton';
import { getPlant } from '../api/my_plants';





function GrowthDetailScreen({ route, navigation }) {
  const { name } = route.params;
  const { location } = route.params;
  var { plant_id } = route.params;
  var { plant_instance_id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [isInstanceLoading, setInstanceLoading] = useState(true);
  const [data, setData] = useState([]);
  const [plantInstanceData, setPlantInstanceData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getPlant(plant_id)
        .then((response) => response)
        .then((json) => {setData(json);})
        .catch((error) => console.error(error))
        .finally(() => {setLoading(false);})

      getPlantInstance(plant_instance_id)
        .then((response) => response)
        .then((json) => {setPlantInstanceData(json);})
        .catch((error) => console.error(error))
        .finally(() => {setInstanceLoading(false);});
        }
  ,[navigation])});



  return (
     
  <View style={styles.background}>
       {(isLoading || isInstanceLoading) ? <ActivityIndicator/> : (
        <View>
          <Carousel pictures={plantInstanceData.pictures} />
          <PlantHeader plant={ data } />

          

          <View style={{alignItems:"center",}}>
          <TouchableOpacity
          	style={styles.loginBtn}
          	onPress={() => navigation.navigate('Plant Details', {
            plant_id: plant_id,
            name: name,
            })}
          >
            <Text style={{color:'white'}}>View Plant Details</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.bold}>Location:</Text>
          <Text>{plantInstanceData.location.name} - {plantInstanceData.high_level_location.name} </Text>
          {plantInstanceData.stages.length >0 && 
            <AddObservationButton plant_id={plant_id} plant_instance_id={plant_instance_id} plant_stages={plantInstanceData.stages} />
          }
        </View>
      )}
      

  </View>
);
}

export default GrowthDetailScreen;


function PlantHeader(props){
  return (
    <View>
      <Text style={{fontSize: 30}}>
        <Text style={{fontStyle: 'italic'}}>{props.plant.genus? props.plant.genus.name : ''} {props.plant.species? props.plant.species.name.toLowerCase() : ''} </Text>
        <VarietyHeader variety={props.plant.variety} />
        <CultivatorHeader cultivator={props.plant.cultivator} />
      </Text>
      <Text style={{fontSize: 20}}>
          {props.plant.common_names? props.plant.common_names.map((name, index) => {
            var commas = "";
            if((props.plant.common_names.length) > (index+1)){
              commas = ", ";
            }
            return (
              <Text key={name.id}>{name.name}{commas}</Text>
            )
          }) : ''}
      </Text>
      
    </View>
  );
}



function Variety(props){
   if(props.variety == null){
    return (null);
  }
  return (<TaxonomySection label="Variety" name={props.variety.name} />)
}

function Cultivator(props){
     if(props.cultivator == null){
    return (null);
  }
  return (<TaxonomySection label="Cultivator" name={props.cultivator.name} />)
}

function VarietyHeader(props){
  if(props.variety == null){
    return <Text></Text>;
  }
  return (<Text><Text>var. </Text><Text style={{fontStyle: 'italic'}}>{props.variety.name.toLowerCase()}</Text></Text>)
}

function CultivatorHeader(props){
  if(props.cultivator == null){
    return <Text></Text>;
  }
  return (<Text>'{props.cultivator.name}'</Text>)
}

function TaxonomySection(props){
  return (
    <View>
      <Text>
        <Text style={styles.bold}>{props.label}: </Text>
        <Text>{props.name}</Text>
      </Text>
    </View>
  );
}

