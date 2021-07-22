import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

    

import { setToken } from '../api/token';
import styles from './../styles/app.style';


const ObservationForm = ({ plant_id, plant_instance_id, photo, buttonText, onSubmit, children, onAuthentication }) => {
  const [email, onChangeEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [image, setImage] = useState(null);
  const [photoURI, setPhotoURI] = useState(photo);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const navigation = useNavigation();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
    
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View>
      <View>
        <Text>Observation Date</Text>
        <DateTimePicker value={date} onChange={onChangeDate} mode='date' maximumDate={new Date()}/>
      </View>

      <View>
        <Text>Add Picture</Text>
        <View>
          {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
          {image && photo && <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />}
          <Text>{ photoURI }</Text>
          <View style={{ flexDirection:"row" }}>
          <Button title="Camera" onPress={() => navigation.navigate('Camera', {plant_id: plant_id,
          plant_instance_id: plant_instance_id,})}/><Button title="Photo Library" onPress={pickImage} />
          </View>
          {hasCameraPermission? <Text>Camera Permission Granted</Text> : <Text>Camera Permission Not Granted</Text>}
          
        </View>
      </View>

      <View>
        <Text>Growing Stage</Text>
        <Text>Percent at Stage</Text>
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

    	<View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        autoCapitalize='none'
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="Email/Username..."
        placeholderTextColor="#CCC" 
      />
      </View>

      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={submit}>
          <Text style={styles.inputText}>{buttonText}</Text>
      </TouchableOpacity>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {children}
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default ObservationForm;