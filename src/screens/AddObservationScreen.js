// App.js 
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import BBCHSlider from './../components/BBCHSlider';

import appStyles from './../styles/app.style';



function App({route, navigation}) {
  var { plant_instance_id } = route.params;
  const { plant_stages } = route.params;
  const [date, setDate] = useState(new Date());
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [selectedStage, setStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    onSubmit(email, password)
      .then(async (res) => {
        console.log('response in submit ' + JSON.stringify(res))
        await setToken(res.token);
        onAuthentication();
      })
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

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

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

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>
      <View>
        <Text>Observation Date</Text>
        <DateTimePicker value={date} onChange={onChangeDate} mode='date' maximumDate={new Date()}/>
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>Growing Stage</Text>
        <BBCHSlider value={10} plant_stages={plant_stages} />
        {/* add percent when you can add multiple stages in this one UI <Text>Percent at Stage</Text> */}
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


      { plant_stages?   
            <View style={{margin:10,}}>
              <Text style={styles.bold}>Your Growing Experience</Text>
                {plant_stages.map((stage) => (
                  <Text>{stage.code}: {stage.description}</Text>
                ))}
            </View>
            : <View><Text>No plant stages</Text></View>
            }



      <TouchableOpacity 
      style={appStyles.loginBtn}
      onPress={submit}>
          <Text style={appStyles.inputText}>Save</Text>
      </TouchableOpacity>
      {errorMessage ? <Text>{errorMessage}</Text> : null}



    </View>
  );
}

export default App;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4e5cf',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});
