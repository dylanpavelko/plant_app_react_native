import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlantLibraryCard from './../components/PlantLibraryCard';


export default function PlantGrid(props) {

    return (

        <FlatList
          data={props.data}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //   />
          // }
          numColumns={3}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <PlantLibraryCard
              id={item.id.toString()} 
              scientific_name_with_common_names={item.scientific_name_with_common_names} 
              image_url={item.image_url}
              nav={props.navigation}
            />
          )}
        />

    );
}

