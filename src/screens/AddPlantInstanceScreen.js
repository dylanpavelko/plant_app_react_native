import React, { useState }  from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import styles from './../styles/app.style';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';



export default function AddPlantInstance({ route, navigation }) {
  const [date, setDate] = useState(new Date());

  const [seedSelected, setSeed]= useState(false)
  const [propSelected, setProp]= useState(false)
  const [plantSelected, setPlant]= useState(false)

  const [selectedLocation, setLocation]= useState()
  const [locationName, setLocationName] = useState('')

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

 return (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.background}>




    <Text style={{fontWeight:'bold'}}>What are you starting from?</Text>
    <TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('seed')}>
	 	<RadioButton selected={seedSelected} /> 
   	 	<Text style={styles2.radioOptionLabel}>Growing from seed</Text>
   	</TouchableOpacity>
   	<TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('prop')}>
    	<RadioButton selected={propSelected}/> 
    	<Text style={styles2.radioOptionLabel}>Propagating Cutting</Text>
    </TouchableOpacity>
   	<TouchableOpacity style={styles2.radioOption} onPress={() => onChangePropType('plant')}>
    	<RadioButton selected={plantSelected} /> 
    	<Text style={styles2.radioOptionLabel}>Acquired Established Plant</Text>
    </TouchableOpacity>


    <Text style={{fontWeight:'bold'}}>When did you start growing this plant?</Text>
    <DateTimePicker value={date} onChange={onChangeDate} mode='date' maximumDate={new Date()}/>

    <Text style={{fontWeight:'bold'}}>Where is this plant going to grow?</Text>
    <Picker selectedValue={selectedLocation}
    	onValueChange={(itemValue, itemIndex) =>
    		setLocation(itemValue) 
    }>
    	<Picker.Item label="Outside" value="out" />
    	<Picker.Item label="Inside" value="in" />
    	<Picker.Item label="Add a New Location" value="new" />
    </Picker>

    { (selectedLocation == 'new')?
    	<View>
    	<Text style={{fontWeight:'bold'}}>New Location Name:</Text>
    	<TextInput style={styles2.input} onChangeText={setLocationName} value={locationName} placeholder='Enter Name of Location You Will Grow this Plant' />
    	</View>
	: null }

	  <View style={{alignItems:"center"}}>
      <View style={styles2.button} >
        <TouchableOpacity
          	onPress={() => navigation.navigate('Add Observation', {
	      })} >
          <View>
          <Text style={{color:'white'}}>Add Plant to My Plants List</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>

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
    
  },
});