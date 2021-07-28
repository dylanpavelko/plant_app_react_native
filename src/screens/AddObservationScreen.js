// App.js 
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


import BBCHSlider from './../components/BBCHSlider';

import { add_observation } from '../api/observation';

import appStyles from './../styles/app.style';



function App({route, navigation}) {
  var { plant_instance_id } = route.params;
  const { plant_stages } = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedStage, setStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Fruit Ripens', value: '60'},
    {label: 'Fruit Ripens - Fully ripe; all pods dry and brown. Seeds dry and hard', value: 'banana', parent: '60'}
  ]);

  const submit = () => {
    imageName = pickedImagePath.uri.split('/')[pickedImagePath.uri.split('/').length - 1]
    add_observation(plant_instance_id, date, value, pickedImagePath, imageName)
      .then(async (res) => {
        console.log('response in observation ' + JSON.stringify(res))
        navigation.navigate('Growth Details', {
          //plant_id: props.plant_id,
          plant_instance_id: plant_instance_id,
          //name: props.name,
          //location: props.location
      })})
      .catch((res) => {
        if (res && res.error) {
          setErrorMessage(res.error);
        }
        console.log(res)
        setErrorMessage('Something went wrong');
      });
  };

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({base64: true, exif: true});

    // Explore the result
    //console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result);
      console.log("selected image: ")
      console.log(result.exif);
      var date_time = result.exif.DateTimeOriginal.split(" ");
      var date_parts = date_time[0].split(":");
      var time_parts = date_time[1].split(":");
      var date = new Date(date_parts[0], date_parts[1] - 1, date_parts[2], time_parts[0], time_parts[1], time_parts[2]);
      console.log(date);
      setDate(date);
    }
  }


  const bbch_code_category = (code) => {
    return code + 1;
  };

  const onChangeDate = (event, selectedDate) => {
  const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({base64: true});

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result);
      console.log("selected image: ")
      setDate(new Date());
    }
  }

  return (

    <ScrollView
    showsHorizontalScrollIndicator={false}
      directionalLockEnabled={true}
      style={styles.screen} >
    

      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath.uri }}
            style={styles.image}
          />
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>
      <View>
        <Text>{pickedImagePath && pickedImagePath.uri.split('.')[pickedImagePath.uri.split('.').length - 1]}</Text>
        <Text>{pickedImagePath && pickedImagePath.uri.split('/')[pickedImagePath.uri.split('/').length - 1]}</Text>
        <Text>Observation Date</Text>
        <DateTimePicker value={date} onChange={onChangeDate} mode='date' maximumDate={new Date()}/>
      </View>
      <View >
        <Text style={{fontWeight:'bold'}}>Growing Stage</Text>
        <Text>BBCH Code: {value}</Text>
        {/* add percent when you can add multiple stages in this one UI <Text>Percent at Stage</Text> */}
      </View>
      
      <View style={{width:'70%', zIndex:1000}}>

        <DropDownPicker
        open={open}
        schema={{
          label: 'description',
          value: 'id'
        }}
        value={value}
        items={plant_stages}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listParentLabelStyle={{
          fontStyle:'italic',
          color:'grey'
        }}
        listMode="SCROLLVIEW"
        searchable={true}
        placeholder="Select a growth stage"
        dropDownContainerStyle={{
          backgroundColor: "#c4e5cf"
        }}
        style={{
          backgroundColor: "#c4e5cf",
          borderWidth: 0

        }}

      />
      </View>
      {/*<View>
        <Text>Watered</Text>
        <Text>Amount</Text>
      </View>

      <View>
        <Text>Add Other Observations</Text>
      </View>

      <View>
        <Text>Add Other Actions</Text>
      </View>

      <View>
        <Text>Notes</Text>
      </View>
      */}
      <View>
        <Text>Plant Instance:</Text>
        <Text> {plant_instance_id} </Text>
      </View>
      <TouchableOpacity 
      style={appStyles.loginBtn}
      onPress={submit}>
          <Text style={appStyles.inputText}>Save</Text>
      </TouchableOpacity>

      {errorMessage ? <Text>{errorMessage}</Text> : null}


      
    
    </ScrollView>

  );
}

export default App;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#c4e5cf',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,

  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});
