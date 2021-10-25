import React, { useState, useEffect }  from 'react';
import { ActivityIndicator, Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import styles from './../styles/app.style';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { getUsersLocations } from '../api/users_locations';
import PlantHeader from '../components/PlantHeader';
import ErrorText from '../components/ErrorText';

import { add_plant_instance } from '../api/my_plants';


const AddPlantInstanceForm = ({ navigation, plant_id }) => {


  const [loading, setLoading]= useState(false)
  const [isLocationLoading, setLocationLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [date, setDate] = useState(new Date());

  const [seedSelected, setSeed]= useState(false)
  const [propSelected, setProp]= useState(false)
  const [plantSelected, setPlant]= useState(false)
  const [propType, setPropType]=useState()

  const [indoorSelected, setIndoor]= useState(true)
  const [outdoorSelected, setOutdoor]= useState(false)

  const [missingField, setMissingField]= useState(false)


  const [locations, setLocations] = useState()
  const [highLevelLocations, setHighLevelLocations] = useState()
  const [selectedLocation, setLocation]= useState()
  const [selectedHighLevelLocation, setHighLevelLocation]= useState()
  const [locationName, setLocationName] = useState('')

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLocationLoading(true);
      getUsersLocations()
        .then((response) => response)
        .then((json) => {
          setLocations(json.locations); 
          if(json.locations.length >0){
            setLocation(json.locations[0].id)
          }
          

          setHighLevelLocations(json.high_level_locations);
          if(json.high_level_locations.length >0){
            setHighLevelLocation(json.high_level_locations[0].id)
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {setLocationLoading(false);})
        }
  ,[navigation])});


  const onChangeDate = (event, selectedDate) => {
	  const currentDate = selectedDate || date;
	    setShow(Platform.OS === 'ios');
	    setDate(currentDate);
  };

  const onChangePropType = (event, selectedType) => {
  	if(event == "seed"){
  		setSeed(true);
  		setProp(false);
  		setPlant(false);
  	}else if(event == "prop"){
  		setSeed(false);
  		setProp(true);
  		setPlant(false);
  	}else if(event == "plant"){
  		setSeed(false);
  		setProp(false);
  		setPlant(true);
  	}
  }


  const onChangeLocType = (event, selectedType) => {
    if(event == "indoor"){
      setIndoor(true);
      setOutdoor(false);
    }else if(event == "outdoor"){
      setIndoor(false);
      setOutdoor(true);
    }
  }


  const submit = () => {
    if(!seedSelected && !propSelected && !plantSelected){
      setMissingField(true)
    }else if(selectedLocation == "new" && locationName == ""){
      setMissingField(true)
    }else{
    
      setLoading(true)
      if(seedSelected){
        setPropType(1);
      }else if(propSelected){
        setPropType(2);
      }else{
        setPropType();
      }

      add_plant_instance(plant_id, date, propType, selectedLocation, locationName, indoorSelected, selectedHighLevelLocation)
        .then(async (res) => {
          setLoading(false);
          console.log('response in observation ' + JSON.stringify(res))
          navigation.navigate('Growth Details', {
            plant_id: plant_id,
            plant_instance_id: res.id,
            //name: props.name,
            //location: props.location
        })})
        .catch((res) => {
          setLoading(false)
          if (res && res.error) {
            setErrorMessage(res.error);
          }
          console.log(res);
          setErrorMessage('Something went wrong');
        });
      
    }

    
    
  };

 return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
    { isLocationLoading ? <ActivityIndicator/> : 
      <>
      { highLevelLocations == undefined ? 
        <View>
          <Text>To the growth of your plants you must first log in.</Text>
          <Button title="Log In / Create Account" onPress={() => navigation.navigate('Log In')} />
        </View>
      : 
      <>
      <ScrollView style={{marginBottom:50}}>
        
        <Text style={{fontWeight:'bold'}}>When did you start growing this plant?</Text>
        <DateTimePicker value={date} onChange={onChangeDate} mode='date' maximumDate={new Date()}/>
        <Text></Text>

        <Text style={{fontWeight:'bold'}}>What are you starting from?</Text>
        {
            (missingField && !seedSelected && !propSelected && !plantSelected) ? <ErrorText text='Select Required Option' /> : <></>
        }
        
        <TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('seed')}>
    	 	<RadioButton selected={seedSelected} /> 
       	 	<Text style={styles2.radioOptionLabel}>Growing From Seed</Text>
       	</TouchableOpacity>
       	<TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('prop')}>
        	<RadioButton selected={propSelected}/> 
        	<Text style={styles2.radioOptionLabel}>Propagating Cutting</Text>
        </TouchableOpacity>
       	<TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('plant')}>
        	<RadioButton selected={plantSelected} /> 
        	<Text style={styles2.radioOptionLabel}>Acquired Established Plant</Text>
        </TouchableOpacity>


        <Text style={{fontWeight:'bold'}}>Where is this plant going to grow?</Text>
        <Picker selectedValue={selectedLocation}
        	onValueChange={(itemValue, itemIndex) =>
        		setLocation(itemValue) 
        }>
          {locations != null ? 
            locations.map((location) => (
              <Picker.Item label={location.name} key={location.id} value={location.id} />
            ))
            :
             null 
           }
        	<Picker.Item label="Add a New Location" value="new" />
        </Picker>

        { (selectedLocation == 'new')?
        	<View>
        	<Text style={{fontWeight:'bold'}}>New Location Name:</Text>
          {
            (missingField && locationName == "") ? <ErrorText text='Location Name Required' /> : <></>
          }
          
        	<TextInput style={styles2.input} onChangeText={setLocationName} value={locationName} placeholder='Enter Name of Location You Will Grow this Plant' />
        
          <Text style={{fontWeight:'bold'}}>Indoors or Outdoors?</Text>
          <TouchableOpacity style={styles2.radioOption} onPress={() => onChangeLocType('indoor')}>
            <RadioButton selected={indoorSelected}/> 
            <Text style={styles2.radioOptionLabel}>Indoors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles2.radioOption} onPress={() => onChangeLocType('outdoor')}>
            <RadioButton selected={outdoorSelected}/> 
            <Text style={styles2.radioOptionLabel}>Outdoors</Text>
          </TouchableOpacity>


          <Text style={{fontWeight:'bold'}}>Belongs to High Level Location:</Text>
          <Picker selectedValue={selectedHighLevelLocation}
              onValueChange={(itemValue, itemIndex) =>
                setHighLevelLocation(itemValue) 
            }>

              {highLevelLocations != null ? 
                highLevelLocations.map((hll) => (
                  <Picker.Item label={hll.name} key={hll.id} value={hll.id} />
                ))
                :
                 null 
               }
            </Picker>
        	</View>
    	: null }
      
      
    
      </ScrollView>
      <View style={{alignItems:"center"}}>
        <View style={styles2.button} >
          <TouchableOpacity onPress={submit} >
            <Text style={{color:'white'}}>Add Plant to My Plants List</Text>
          </TouchableOpacity>
        </View>
        </View>
        </>

    }
    </>}

  	  

    </KeyboardAvoidingView>
  
);

}


function RadioButton(props) {
  return (
      <View style={[{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }, props.style]}>
        {
          props.selected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}/>
            : null
        }
      </View>
  );
}

const styles2 = StyleSheet.create({
  radioOption: {
    flexDirection: 'row',
    padding: 15,
  },
  radioOptionLabel: {
  	paddingLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    backgroundColor:"#18cd58",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    margin: 5,
    padding: 10,
    bottom: 50,
    
  },
});

export default AddPlantInstanceForm;