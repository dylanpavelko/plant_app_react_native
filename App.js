import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Home from './src/screens/HomeScreen';
import Profile from './src/screens/ProfileScreen';
import PlantLibrary from './src/screens/PlantLibraryScreen';
import PlantDetail from './src/screens/PlantDetailScreen';

function DetailsScreen({route, navigation}) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen for { name }</Text>
      <Text>Blah</Text>
    </View>
  );
}





const Stack = createStackNavigator();

function App() {

  

  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Plant Details" component={PlantDetail} />
        <Stack.Screen name="Plant Library" component={PlantLibrary} />
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
