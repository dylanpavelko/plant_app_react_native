import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Plants!</Text>
      <PlantLink name="Sheffrela" nav={navigation} />
      <PlantLink name="Pilea" nav={navigation} />
      <PlantLink name="Fittonia" nav={navigation} />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen for { name }</Text>
    </View>
  );
}

function PlantLink(props){
  const navigation = useNavigation();
  return (
    <Button
      title={props.name}
      color="tan"
      onPress={() => navigation.navigate('Details',{
                      name: props.name
      })}
      style ={styles.plantLink}
    />
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#129840',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: 'white',
      fontSize: 30
    },
    plantLink: {
      color: 'white',
      backgroundColor: 'yellow'
    }
  
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
