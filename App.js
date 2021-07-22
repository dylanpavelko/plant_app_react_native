import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Home from './src/screens/HomeScreen';
import Profile from './src/screens/ProfileScreen';
import PlantLibrary from './src/screens/PlantLibraryScreen';
import PlantDetail from './src/screens/PlantDetailScreen';
import GrowthDetail from './src/screens/GrowthDetailScreen';
import MyPlants from './src/screens/MyPlantsScreen';
import LogIn from './src/screens/LogInScreen';
import AddObservation from './src/screens/AddObservationScreen';


import FooterNavigation from './src/components/FooterNavigation';
import {navigationRef} from './src/utilities/RootNavigation';


const Stack = createStackNavigator();

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Plant Details" component={PlantDetail} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="Growth Details" component={GrowthDetail} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="Plant Library" component={PlantLibrary} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="My Plants" component={MyPlants} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="My Profile" component={Profile} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="Log In" component={LogIn} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
          <Stack.Screen name="Add Observation" component={AddObservation} options={{headerStyle: {backgroundColor: '#c4e5cf'}}}/>
        </Stack.Navigator>
      </NavigationContainer>
      <FooterNavigation />
    </View>
  );
}



export default App;
