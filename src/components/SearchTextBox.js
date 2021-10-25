import React, { useEffect, useState }  from 'react';
import { Linking, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { search_plants } from '../api/my_plants';


export default function SearchTextBox(props) {
    const [query, setQuery] = useState('')
    const parentState = props.state

  const handleSearch = text => {
    setQuery(text)
    console.log(text)
    if(text.length >= 2){
      // setLoading(true);
      search_plants(text)
      .then((response) => response)
      .then((json) => {
        console.log(json);
        props.update(json)
      })
      .catch((error) => {
        console.error(error)
      })
      // .finally(() => {setLoading(false);})
    }else{
      props.reset(text)
    }
 
  }

    return (

          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 20,
              width: '90%'
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              placeholder="Search plants..."
              value={query}
              onChangeText={(text) => handleSearch(text)}
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>


    );
}

const styles = StyleSheet.create({
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